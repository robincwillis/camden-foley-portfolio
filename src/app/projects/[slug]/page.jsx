import { draftMode, cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

import { getProject } from "@/lib/api/projects";
import { getProjectSections } from "@/lib/api/projectSections";
import { getCollectionIds } from "@/lib/utils/contentful";
import { isLoggedIn } from "@/lib/utils/cookies";

import Sidebar from "@/app/_components/sidebar";
import ProjectSlide from "@/app/_components/project-slide";
import Head from "@/app/_components/head";
import RichText from "@/app/_components/rich-text";
import ProcessSection from "@/app/_components/process-section";

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

  if (!project) {
    notFound();
  }

  if (project.locked && !isLoggedIn()) {
    redirect("/");
  }

  const sectionIds = getCollectionIds(project.sectionsCollection);
  const sections = await getProjectSections(sectionIds);
  const sortedSections = sections.sort((a, b) => {
    return sectionIds.indexOf(a.sys.id) - sectionIds.indexOf(b.sys.id);
  });
  return (
    <>
      <Head title={project.name} />
      <div className="relative z-10 lg:flex lg:h-[calc(100vh-60px)] lg:overflow-y-hidden">
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
        <div
          className="lg:flex-1 lg:overflow-y-scroll"
          style={{
            viewTransitionName: "project-sections",
          }}
        >
          {sortedSections.map((section, index) => (
            <ProjectSlide
              key={section.sys.id}
              title={section.title}
              description={section.description}
              images={section.imagesCollection.items}
              mobileImages={
                section?.mobileImagesCollection?.items.length > 0
                  ? section.mobileImagesCollection.items
                  : section.imagesCollection.items
              }
              wrapDescription={section.wrapDescription}
            />
          ))}

          <div className="p-5 flex items-center justify-between">
            <RichText
              document={project.closing.json}
              classNames={{
                paragraph: "text-2xl",
                bold: "font-medium",
              }}
            />
            <ProcessSection
              processSlides={project.processSlidesCollection.items}
            />
          </div>
        </div>
      </div>
    </>
  );
}
