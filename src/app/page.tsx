import AllPages from "@/components/landing-pages";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 min-w-screen">
      <Link href="/new-page">
        <button
          type="button"
          className="text-white bg-gray-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-max"
        >
          New Page
        </button>
      </Link>
      <hr className="my-4" />
      <AllPages />
    </main>
  );
}
