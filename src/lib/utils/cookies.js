import { cookies } from "next/headers";

export async function isLoggedIn() {
  const cookiesStore = await cookies();
  const loginCookie = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME);
  return !!loginCookie?.value;
}

export async function getUnlockedProjects() {
  const cookiesStore = await cookies();
  const unlockedCookie = cookiesStore.get("unlocked_projects");
  if (!unlockedCookie?.value) {
    return [];
  }
  try {
    return JSON.parse(unlockedCookie.value);
  } catch {
    return [];
  }
}

export async function isProjectUnlocked(slug) {
  if (await isLoggedIn()) {
    return true;
  }
  const unlockedProjects = await getUnlockedProjects();
  return unlockedProjects.includes(slug);
}
