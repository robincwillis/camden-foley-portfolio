import Image from 'next/image';

import Sidebar from '@/app/_components/sidebar'
import ProjectSlide from '@/app/_components/project-slide'

const imageUrl = 'https://images.unsplash.com/photo-1718027808460-7069cf0ca9ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const project = {
  id: "i",
  image: imageUrl,
  title: "Future Refidgeration",
  client: "Walmart",
  date: "2024",
  tags: ["project in development"]
}
// 126%

const slides = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
]

export default function FirstProject() {
  return (
    <div className="lg:flex lg:h-full lg:overflow-y-hidden pb-[184px] lg:pb-0">
      <Sidebar 
        image={project.image}
        title={project.title}
        client={project.client}
        date={project.date}
        tags={project.tags} 
      />
      <div className="lg:flex-1 lg:overflow-y-scroll">
        {slides.map((slide, index) => (
          <ProjectSlide 
            key={slide.id} 
            isLast={index === slides.length -1}
          />
        ))}
      </div>
    </div>
  );
}