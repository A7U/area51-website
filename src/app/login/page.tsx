"use client"
import Link from "next/link";
import { Navigation } from "../components/nav";
import { useFormState } from "react-dom";
import { login } from "../actions";

export default function LoginPage() {
  
  // const { user } = await validateRequest();
  // if (user) {
  //   return redirect("/");
  // }
  // @ts-ignore
  const [state, formAction] = useFormState(login, null);

  return (
    <>
    <Navigation/>
      <div className="flex min-h-full flex-1">
        <div className="lg:flex- flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img className="h-10 w-auto" src="/logo.svg" alt="ZieDit" />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login voor ZieDit!
              </h2>
            </div>

            <div className="mt-10">
              <div>
                {/* @ts-ignore */}
                <form action={formAction} className="space-y-6">
                  {state?.error && (
                    <div className="bg-red-600 rounded-lg py-2 px-2 text-white">{state?.error}</div>
                  )}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Gebruikersnaam
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="username"
                        autoComplete="username"
                        required
                        className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Wachtwoord
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm leading-6">
                      <Link
                        href="/register"
                        className="font-semibold text-red-600 hover:text-red-500"
                      >
                        Heb je nog geen account? Registreer
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm transition hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/zitdit_banner.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}