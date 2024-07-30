import { cookies } from "next/headers";

const debug = false;

export async function POST(request, params) {
  const data = await request.json();
  const password = data.password;

  const options = debug ? { maxAge: 0 } : {};
  const cookie = cookies().set(
    process.env.PASSWORD_COOKIE_NAME,
    "true",
    options,
  );

  if (process.env.SITE_PASSWORD !== password) {
    return new Response("incorrect password", {
      status: 401,
    });
  }

  return new Response("password correct", {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
