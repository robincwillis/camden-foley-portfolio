import { getAllProjects, getCollectionProjects } from "@/lib/api/projects";
import { getPage } from "@/lib/api/pages";
import { getCollection } from "@/lib/api/collections";

import { isLoggedIn } from "@/lib/utils/cookies";
import { getCollectionIds } from "@/lib/utils/contentful";

import ProjectThumbnail from "@/app/_components/project-thumbnail";
import RichText from "@/app/_components/rich-text";
import Image from "@/app/_components/image";

// export const generateMetadata = async ({
//     params
// }) => {
//     const { isEnabled } = draftMode()

//     const project = await getProject(params.slug, isEnabled)
//     return { title: project.name }
// }

export default async function Collection({ params }) {
  const collection = await getCollection(params.slug);
  const page = await getPage("");
  const projectIds = getCollectionIds(collection.projectsCollection);

  const collectionProjects = await getCollectionProjects(projectIds);
  const projects = await getAllProjects();

  //const loggedIn = false;
  const loggedIn = isLoggedIn();

  const lockup = page?.sectionsCollection?.items[0];
  const { heroImage } = collection;

  return (
    <div className="p-5 lg:p-10 flex flex-col space-y-5 lg:space-y-10">
      {/* Header */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-4">
        <div className="lg:col-span-2 pb-5 lg:pb-0">
          <h1 className="text-4xl font-medium">{lockup?.headline}</h1>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-lg font-medium">{lockup?.subHeadline}</h2>
        </div>
        <div className="lg:col-span-7 lg:justify-end">
          <RichText
            document={lockup.body.json}
            classNames={{
              paragraph: "text-lg lg:text-base xl:text-lg font-light",
            }}
          />
        </div>
      </div>
      {/* Collection Grid */}
      <div className="grid gap-x-5 gap-y-10 grid-cols-2 md:grid-cols-5 lg:grid-cols-7">
        <div className="col-span-2">
          <Image
            imageUrl={heroImage.url}
            width={heroImage.width}
            height={heroImage.height}
            alt={heroImage.description}
            ratio={0.625}
          />
          <h2 className="font-display text-2xl">{collection.name}</h2>
          <p className="font-display text-lg">{collection.description}</p>
        </div>
        {collectionProjects.map((project) => (
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

      <hr className="bg-black border-black" />
      {/* Project Grid */}
      <div className="grid gap-x-5 gap-y-5 lg:gap-y-10 grid-cols-2 md:grid-cols-5 lg:grid-cols-7">
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
  );
}
