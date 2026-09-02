import { draftMode } from "next/headers";
import { redirect, notFound } from "next/navigation";

import { getProject } from "@/lib/api/projects";
import { getProjectSections } from "@/lib/api/projectSections";
import { getCollectionIds } from "@/lib/utils/contentful";
import { isProjectUnlocked } from "@/lib/utils/cookies";

import Sidebar from "@/app/_components/sidebar";
import ProjectSlide from "@/app/_components/project-slide";
import Head from "@/app/_components/head";
import RichText from "@/app/_components/rich-text";
import ProcessSection from "@/app/_components/process-section";

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  const project = await getProject(slug, isEnabled);
  return project
    ? {
        title: project.name,
        keywords: project?.tags || "",
        description: project?.description || "",
      }
    : {};
};

export default async function Project({ params }) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();

  const project = await getProject(slug, isEnabled);

  if (!project) {
    notFound();
  }

  if (project.locked && !(await isProjectUnlocked(project.slug))) {
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
          id="project-content-scroll"
          className="lg:flex-1 lg:overflow-y-scroll lg:pb-[60px]"
          style={{}}
        >
          {sortedSections.map((section, index) => {
            const projectImages =
              section.projectSectionImagesCollection?.items ?? [];
            const usesImageCaptions = projectImages.length > 0;

            const orderedImages = usesImageCaptions
              ? projectImages.map((item) => ({
                  sys: item.sys,
                  url: item.desktopImage.url,
                  width: item.desktopImage.width,
                  height: item.desktopImage.height,
                  description: item.desktopImage.description || item.name,
                  caption: item.description?.json ?? null,
                }))
              : section.imagesCollection.items;

            const images = section.reverseDesktopImages
              ? [...orderedImages].reverse()
              : orderedImages;

            const orderedMobileImages = usesImageCaptions
              ? projectImages.map((item) => {
                  const mobileAsset = item.mobileImage || item.desktopImage;
                  return {
                    sys: item.sys,
                    url: mobileAsset.url,
                    width: mobileAsset.width,
                    height: mobileAsset.height,
                    description: mobileAsset.description || item.name,
                    caption: item.description?.json ?? null,
                  };
                })
              : section?.mobileImagesCollection?.items.length > 0
                ? section.mobileImagesCollection.items
                : section.imagesCollection.items;

            const mobileImages = section.reverseMobileImages
              ? [...orderedMobileImages].reverse()
              : orderedMobileImages;

            return (
              <ProjectSlide
                key={section.sys.id}
                title={section.title}
                description={section.description}
                images={images}
                mobileImages={mobileImages}
                wrapDescription={section.wrapDescription}
              />
            );
          })}

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
