import { cookies } from "next/headers";
import { getProject, getAllProjects } from "@/lib/api/projects";

const debug = false;

// Session duration: 8 hours in seconds
const SESSION_MAX_AGE = 8 * 60 * 60;

export async function POST(request, params) {
  const data = await request.json();
  const password = data.password;
  const projectSlug = data.projectSlug;

  const cookiesStore = await cookies();
  const options = debug ? { maxAge: 0 } : { maxAge: SESSION_MAX_AGE };

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
    // Draft/unpublished Password entries resolve to null items here, not omitted entries
    const passwordValues = projectPasswords.filter(Boolean).map((p) => p.value);

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

      // Find all projects that share this password and unlock them all
      const allProjects = await getAllProjects();
      const projectsWithPassword = allProjects.filter((p) => {
        const passwords = p.passwordsCollection?.items || [];
        return passwords.filter(Boolean).some((pw) => pw.value === password);
      });

      for (const p of projectsWithPassword) {
        if (!unlockedProjects.includes(p.slug)) {
          unlockedProjects.push(p.slug);
        }
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
