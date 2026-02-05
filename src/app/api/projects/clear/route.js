import { cookies } from "next/headers";

export async function POST() {
  const cookiesStore = await cookies();

  // Clear the global site password cookie
  cookiesStore.delete(process.env.PASSWORD_COOKIE_NAME);

  // Clear the unlocked projects cookie
  cookiesStore.delete("unlocked_projects");

  return new Response("cookies cleared", { status: 200 });
}
