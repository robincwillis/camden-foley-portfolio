import { getAllProjects } from "@/lib/api/projects";
import { getPage } from "@/lib/api/pages";

import { isLoggedIn } from "@/lib/utils/cookies";

import ProjectThumbnail from "@/app/_components/project-thumbnail";
import RichText from "@/app/_components/rich-text";

const page = await getPage("");

export const metadata = {
  title: page.title,
};

export default async function Home() {
  const projects = await getAllProjects();

  //const loggedIn = false;
  const loggedIn = isLoggedIn();

  const lockup = page?.sectionsCollection?.items[0];

  return (
    <>
      <div className="p-10 pb-[184px] lg:pb-10 flex flex-col space-y-10">
        {/* Header */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-4">
          <div className="lg:col-span-3 pb-5 lg:pb-0">
            <h1 className="text-4xl font-medium">{lockup?.headline}</h1>
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-lg">{lockup?.subHeadline}</h2>
          </div>
          <div className="lg:col-span-6">
            <RichText
              document={lockup.body.json}
              classNames={{
                paragraph: "text-lg font-light",
              }}
            />
          </div>
        </div>
        {/* Project Grid */}
        <div className="grid gap-x-5 gap-y-10 grid-cols-2 md:grid-cols-5 lg:grid-cols-7">
          {projects.map((project) => (
            <ProjectThumbnail
              key={project.id}
              id={project.sys.id}
              slug={project.slug}
              image={project.heroImage}
              name={project.name}
              client={project.client}
              date={project.date}
              tags={project.tags}
              locked={!loggedIn && project.locked}
            />
          ))}
        </div>
      </div>
    </>
  );
}
