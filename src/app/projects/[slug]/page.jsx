import { draftMode, cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getProject } from "@/lib/api/projects";
import { getProjectSections } from "@/lib/api/projectSections";
import { getCollectionIds } from "@/lib/utils/contentful";
import { isLoggedIn } from "@/lib/utils/cookies";

import Sidebar from "@/app/_components/sidebar";
import ProjectSlide from "@/app/_components/project-slide";
import Head from "@/app/_components/head";
import RichText from "@/app/_components/rich-text";

export const generateMetadata = async ({ params }) => {
  const { isEnabled } = draftMode();

  const project = await getProject(params.slug, isEnabled);
  return {
    title: project.name,
    keywords: project?.tags || "",
    description: project?.description || "",
  };
};

export default async function Project({ params }) {
  const { isEnabled } = draftMode();
  const project = await getProject(params.slug, isEnabled);

  if (project.locked && !isLoggedIn()) {
    redirect("/");
  }

  const sectionIds = getCollectionIds(project.sectionsCollection);
  const sections = await getProjectSections(sectionIds);
  const sortedSections = sections.sort((a, b) => {
    return sectionIds.indexOf(a.sys.id) - sectionIds.indexOf(b.sys.id);
  });

  return (
    <div className="lg:flex lg:h-full lg:overflow-y-hidden lg:pb-[60px]">
      <Head title={project.name} />
      <Sidebar
        id={project.sys.id}
        image={project.heroImage}
        name={project.name}
        client={project.client}
        date={project.date}
        tags={project.tags}
        brief={project.brief}
        role={project.role}
        team={project.team}
        closing={project.closing}
        highlights={project.highlights}
      />
      <div className="lg:flex-1 lg:overflow-y-scroll">
        {sortedSections.map((section, index) => (
          <ProjectSlide
            key={section.sys.id}
            title={section.title}
            description={section.description}
            images={section.imagesCollection.items}
            wrapDescription={section.wrapDescription}
          />
        ))}

        <div className="p-5">
          <RichText
            document={project.closing.json}
            classNames={{
              paragraph: "text-2xl",
              bold: "font-medium",
            }}
          />
        </div>
      </div>
    </div>
  );
}
