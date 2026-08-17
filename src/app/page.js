import { getAllProjects } from "@/lib/api/projects";
import { getPage } from "@/lib/api/pages";

import { isLoggedIn, getUnlockedProjects } from "@/lib/utils/cookies";

import ProjectThumbnail from "@/app/_components/project-thumbnail";
import PageLockup from "@/app/_components/page-lockup";

const page = await getPage("");

export const metadata = {
  title: page.title,
};

export default async function Home() {
  const projects = await getAllProjects();

  const loggedIn = await isLoggedIn();
  const unlockedProjects = await getUnlockedProjects();

  const lockup = page?.sectionsCollection?.items[0];

  return (
    <>
      <div className="p-5 lg:p-10 lg:pb-[80px] flex flex-col space-y-5 lg:space-y-10">
        <PageLockup lockup={lockup} />
        {/* Project Grid */}
        <div className="grid gap-x-5 gap-y-5 lg:gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 laptop:grid-cols-6 xl:grid-cols-7">
          {projects.map((project) => {
            const isUnlocked =
              loggedIn || unlockedProjects.includes(project.slug);
            return (
              <ProjectThumbnail
                key={project.sys.id}
                id={project.sys.id}
                slug={project.slug}
                image={project.heroImage}
                name={project.name}
                mobileName={project.mobileName}
                client={project.client}
                date={project.date}
                tags={project.tags}
                locked={project.locked && !isUnlocked}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
