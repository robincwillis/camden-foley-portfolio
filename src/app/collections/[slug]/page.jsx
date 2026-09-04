import { notFound } from "next/navigation";

import { getAllProjects, getCollectionProjects } from "@/lib/api/projects";
import { getPage } from "@/lib/api/pages";
import { getCollection } from "@/lib/api/collections";

import { isLoggedIn, getUnlockedProjects } from "@/lib/utils/cookies";
import { getCollectionIds } from "@/lib/utils/contentful";

import CollectionThumbnail from "@/app/_components/collection-thumbnail";
import ProjectThumbnail from "@/app/_components/project-thumbnail";
import PageLockup from "@/app/_components/page-lockup";

export default async function Collection({ params }) {
  const { slug } = await params;
  const collection = await getCollection(slug);

  if (!collection) {
    notFound();
  }

  const page = await getPage("");
  const projectIds = getCollectionIds(collection.projectsCollection);

  const collectionProjects = await getCollectionProjects(projectIds);
  const projects = await getAllProjects();

  // Old Version: Don't repeat projects that are featured in the collection
  // const filteredProjects = projects.filter(
  //   (project) => !projectIds.includes(project.sys.id),
  // );

  const sortedCollectionProjects = collectionProjects.sort((a, b) => {
    return projectIds.indexOf(a.sys.id) - projectIds.indexOf(b.sys.id);
  });

  const loggedIn = await isLoggedIn();
  const unlockedProjects = await getUnlockedProjects();

  const lockup = page?.sectionsCollection?.items[0];
  const { heroImage } = collection;

  return (
    <div className="p-5 lg:p-10 lg:pb-[80px] flex flex-col space-y-5 lg:space-y-10">
      <div className="lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-medium">{collection.name}</h2>
        </div>
        <div className="hidden md:block lg:col-span-7 lg:text-right">
          <p className="text-lg lg:text-base xl:text-lg font-medium">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="grid gap-x-5 gap-y-5 lg:gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 laptop:grid-cols-6 xl:grid-cols-7">
        <CollectionThumbnail
          image={heroImage}
          description={collection.description}
        />
        {sortedCollectionProjects.map((project) => {
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
              placement="collection"
            />
          );
        })}
      </div>
      <div>
        <hr className="mt-3.5 mb-2.5 lg:mt-1.5 lg:mb-0 bg-black border-black" />
      </div>
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
              client={project.client}
              date={project.date}
              tags={project.tags}
              locked={project.locked && !isUnlocked}
              placement="all"
            />
          );
        })}
      </div>
    </div>
  );
}
