"use client"

import ProjectThumbnail from '@/app/_components/project-thumbnail'

const imageUrl = 'https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const projects = Array.from({ length: 31 }, (_, i) => ({
  id: i,
  image: imageUrl,
  title: "Future Refidgeration",
  client: "Walmart",
  date: "2024",
  tags: ["project in development"]
}));


export default function Home() {

  return (
    <div className="p-10 pb-[184px] lg:pb-[80px] flex flex-col space-y-10">
      {/* Header */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-4">
        <div className="lg:col-span-3 pb-5 lg:pb-0">
          <h1 className="text-4xl font-medium">
            Portfolio.
          </h1>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-lg">
            @ Walmart. Razer. IDEO. NewDeal.
          </h2>
        </div>
        <div className="lg:col-span-6">
          <h3 className="text-lg font-light">
            w/ Google. Meta. Amazon. Verizon. Fitbit. Belkin. Herschel. J&J. Verb Surgical. Ford. Nestle. Lilly. Kohls. Michelin. Marvin. Willow. Ainsworth.
          </h3>
        </div>
      </div>
      {/* Project Grid */}
      <div
        className="grid gap-x-5 gap-y-10 grid-cols-2 md:grid-cols-5 lg:grid-cols-7"
      >
        {projects.map((project) => (
          <ProjectThumbnail
            key={project.id}
            image={project.image}
            title={project.title}
            client={project.client}
            date={project.date}
            tags={project.tags}
          />
        ))}
      </div>

    </div >
  );
}