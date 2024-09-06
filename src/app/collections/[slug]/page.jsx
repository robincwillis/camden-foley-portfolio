import { notFound } from "next/navigation";

import { getAllProjects, getCollectionProjects } from "@/lib/api/projects";
import { getPage } from "@/lib/api/pages";
import { getCollection } from "@/lib/api/collections";

import { isLoggedIn } from "@/lib/utils/cookies";
import { getCollectionIds } from "@/lib/utils/contentful";

import CollectionThumbnail from "@/app/_components/collection-thumbnail";
import ProjectThumbnail from "@/app/_components/project-thumbnail";
import RichText from "@/app/_components/rich-text";

export default async function Collection({ params }) {
  const collection = await getCollection(params.slug);

  if (!collection) {
    notFound();
  }

  const page = await getPage("");
  const projectIds = getCollectionIds(collection.projectsCollection);

  const collectionProjects = await getCollectionProjects(projectIds);
  const projects = await getAllProjects();

  // Don't repeat projects that are featured in the collection
  const filteredProjects = projects.filter(
    (project) => !projectIds.includes(project.sys.id),
  );

  const sortedCollectionProjects = collectionProjects.sort((a, b) => {
    return projectIds.indexOf(a.sys.id) - projectIds.indexOf(b.sys.id);
  });

  const loggedIn = isLoggedIn();

  const lockup = page?.sectionsCollection?.items[0];
  const { heroImage } = collection;

  return (
    <div className="p-5 lg:p-10 lg:pb-[80px] flex flex-col space-y-5 lg:space-y-10">
      {/* Header */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-4">
          <div className="lg:col-span-2 pb-5 lg:pb-0">
            <h1 className="text-4xl font-medium">{lockup?.headline}</h1>
          </div>
          <div className="mb-1 lg:mb-0 lg:col-span-3">
            <h2 className="text-lg font-medium">{lockup?.subHeadline}</h2>
          </div>
          <div className="lg:col-span-7 flex lg:justify-end">
            <RichText
              document={lockup.body.json}
              classNames={{
                paragraph: "text-lg lg:text-base xl:text-lg font-light",
              }}
            />
          </div>
        </div>
      {/* Collection Grid */}
      <div className="grid gap-x-5 gap-y-5 lg:gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 laptop:grid-cols-6 xl:grid-cols-7">
        <CollectionThumbnail
          image={heroImage}
          name={collection.name}
          description={collection.description}
        />
        {sortedCollectionProjects.map((project) => (
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
            locked={!loggedIn && project.locked}
          />
        ))}
      </div>
      <div>
        <hr className="my-2.5 lg:my-0 bg-black border-black" />
      </div>
      {/* Project Grid */}
      <div className="grid gap-x-5 gap-y-5 lg:gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 laptop:grid-cols-6 xl:grid-cols-7">
        {filteredProjects.map((project) => (
          <ProjectThumbnail
            key={project.sys.id}
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
  );
}
