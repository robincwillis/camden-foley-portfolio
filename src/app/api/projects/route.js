import { cookies } from "next/headers";
import { getProject } from "@/lib/api/projects";

const debug = false;

export async function POST(request, params) {
  const data = await request.json();
  const password = data.password;
  const projectSlug = data.projectSlug;

  const cookiesStore = await cookies();
  const options = debug ? { maxAge: 0 } : {};

  // Global site password check
  if (process.env.SITE_PASSWORD === password) {
    const cookie = cookiesStore.set(
      process.env.PASSWORD_COOKIE_NAME,
      "true",
      options,
    );
    return new Response("password correct", {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
      },
    });
  }

  // Project-specific password check
  if (projectSlug) {
    const project = await getProject(projectSlug.replace(/^\//, ""));
    const projectPasswords = project?.passwordsCollection?.items || [];
    const passwordValues = projectPasswords.map((p) => p.value);

    if (passwordValues.includes(password)) {
      // Get existing unlocked projects
      const unlockedCookie = cookiesStore.get("unlocked_projects");
      let unlockedProjects = [];
      try {
        unlockedProjects = unlockedCookie?.value
          ? JSON.parse(unlockedCookie.value)
          : [];
      } catch {
        unlockedProjects = [];
      }

      // Add this project if not already unlocked
      if (!unlockedProjects.includes(project.slug)) {
        unlockedProjects.push(project.slug);
      }

      const cookie = cookiesStore.set(
        "unlocked_projects",
        JSON.stringify(unlockedProjects),
        options,
      );

      return new Response("password correct", {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
      });
    }
  }

  return new Response("incorrect password", {
    status: 401,
  });
}
