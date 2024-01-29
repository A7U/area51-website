"use server"
import { db } from "@/server/db";

import { lucia, validateRequest } from "@/server/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import { generateId } from "lucia";

export async function signup(currentState: any, formData: FormData, _: any) {

	const email = formData.get("email");

	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Gebruikersnaam moet tussen de 3 en 31 karakters bevatten, en mag alleen kleine letters, cijfers, - en _ bevatten",
		};
	}
	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Wachtwoord moet meer dan 6 karakters bevatten",
		};
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);

	const checkUsername = await db.user.findUnique({
		where: {
			username: username as string,
		},
	});

	if (checkUsername) {
		return {
			error: "Gebruikersnaam is al in gebruik",
		};
	}
	const checkEmail = await db.user.findUnique({
		where: {
			email: email as string,
		},
	});

	if (checkEmail) {
		return {
			error: "Email is al in gebruik",
		};
	}





	const user = await db.user.create({
		data: {
			id: userId,
			username: username,
			email: email as string,
			hashed_password: hashedPassword,
		},
	});

	if (user) {
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
		return redirect("/");
	}
}

export async function login(currentState: any, formData: FormData, _: any) {
	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}
	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid wachtwoord",
		};
	}

	const existingUser = await db.user.findUnique({
		where: {
			username: username,
		},
	});
	if (!existingUser) {
		return {
			error: "Incorrect username or password",
		};
	}
	// @ts-ignore
	const validPassword = await new Argon2id().verify(
		existingUser.hashed_password,
		password,
	);
	if (!validPassword) {
		return {
			error: "Incorrect username or password",
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect("/");
}


export async function logout() {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}