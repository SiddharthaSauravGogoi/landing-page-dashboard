import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard | Landing Page Creator",
  description: "Create Landing Pages on the fly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const loggedInUser = cookieStore.get("currentUser")?.value || "";

  async function deleteThemeCookie() {
    "use server";

    cookies().delete("currentUser");
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {loggedInUser && (
          <nav className="w-full min-h-[64px] flex justify-between p-4">
            <Link href="/">Dashboard</Link>
            <div className="flex">
              <p> {loggedInUser} </p>
              <form action={deleteThemeCookie} className="ml-4 sm:font-xs">
                <button type="submit"> Logout</button>
              </form>
            </div>
          </nav>
        )}
        {children}
      </body>
    </html>
  );
}
