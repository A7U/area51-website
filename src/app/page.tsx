import { redirect } from "next/navigation";
import { validateRequest, lucia } from "@/server/auth";
import { Navigation } from "./components/nav";
import { cookies } from "next/headers";

const posts = [
  {
    id: 1,
    title: "AI in de industrie",
    href: "#",
    imageUrl:
      "https://dataintelligence.zuyd.nl/wp-content/uploads/2021/10/WhatsApp-Image-2021-09-08-at-12.36.49-2.jpeg",
    date: "Feb 10, 2024",
    datetime: "2024-02-10",
  },

  {
    id: 2,
    title: "AI in de zorg",
    href: "#",
    imageUrl:
      "https://dataintelligence.zuyd.nl/wp-content/uploads/2022/02/Snuffelfiets.jpg",
    date: "Feb 11, 2024",
    datetime: "2024-02-11",
  },

  {
    id: 3,
    title: "Verantwoorde AI",
    href: "#",
    imageUrl:
      "https://dataintelligence.zuyd.nl/wp-content/uploads/2022/11/statusStudentenMarcel-scaled.jpg",
    date: "Feb 12, 2024",
    datetime: "2024-02-12",
  },
  // More posts...
];

export default async function Page() {
  const { user } = await validateRequest();

  return (
    <div className="grid">
      <Navigation username={user?.username || null} />

      <div className="grid gap-8 items-center justify-items-center py-10">
        {user && (
          <h1 className="text-xl font-semibold text-gray-900">Welkom {user.username}</h1>
        )}

        {!user && (
          <h1 className="text-xl font-semibold text-gray-900">
            Welkom bij ZieDit! Log in om mee te delen!
          </h1>
        )}

        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Aankomende events
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 min-w-96"
                >
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                  <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                    <time dateTime={post.datetime} className="mr-8">
                      {post.date}
                    </time>
                    <div className="-ml-4 flex items-center gap-x-4">
                      <svg
                        viewBox="0 0 2 2"
                        className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                      >
                        <circle cx={1} cy={1} r={1} />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
