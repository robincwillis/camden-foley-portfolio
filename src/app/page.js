"use client"

import { useState } from "react";
import { motion, cubicBezier } from "framer-motion";

import ProjectThumbnail from '@/app/_components/project-thumbnail'

const variants = {
  closed: (origin) => {
    return {
      position: "relative",
      opacity: 1, x: 0
    }
  },
  open: (originPosition) => {
    const targetPosition = { x: 40, y: 80 }
    return {
      position: "fixed",
      opacity: 1,
      x: targetPosition.x - originPosition.x,
      y: targetPosition.y - originPosition.y,
      zIndex: 20,
      width: 353,
      height: 447

    }
  }
}

const numbers = Array.from({ length: 31 }, (_, i) => i);
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
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false);
  const [originPosition, setOriginPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  return (
    <div className="p-10 mb-10 flex flex-col space-y-10">
      {/* Header */}
      <div className="grid-cols-3">
        <h1 className="text-4xl font-medium">
          Portfolio.
        </h1>
        <h2 className="text-lg">
          @ Walmart. Razer. IDEO. NewDeal.
        </h2>
        <h3 className="text-lg font-light">
          w/ Google. Meta. Amazon. Verizon. Fitbit. Belkin. Herschel. J&J. Verb Surgical. Ford. Nestle. Lilly. Kohls. Michelin. Marvin. Willow. Ainsworth.
        </h3>
      </div>
      {/* Project Grid */}
      <div
        className="grid gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-7"
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


// {numbers.map((number) => (
//   <Link
//     key={number}
//     href="/projects"
//     className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
//   >
//     <div key={number}>
//       <div onClick={(e) => {
//         const rect = e.target.getBoundingClientRect();
//         setOriginPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
//         setIsAnimating(true);
//         setIsOpen(number)
//       }}>
//         <motion.div
//           layout
//           animate={isOpen === number ? "open" : "closed"}
//           variants={variants}
//           custom={originPosition}
//           transition={{
//             ease: cubicBezier(.35, .17, .3, .86),
//             duration: 0.5,
//           }}
//         >
//           <Image />
//         </motion.div>
//       </div>
//       {isOpen !== number && (

//         <h1>First Project</h1>
//       )}
//     </div>
//    </Link>
// ))}