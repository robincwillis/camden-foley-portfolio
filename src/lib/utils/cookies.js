import { cookies } from "next/headers";

export function isLoggedIn() {
  const cookiesStore = cookies();
  const loginCookie = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME);
  return !!loginCookie?.value;
}
