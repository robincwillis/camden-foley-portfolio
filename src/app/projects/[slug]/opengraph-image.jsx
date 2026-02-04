import { ImageResponse } from "next/og";
import Image from "next/image";

import { getProject } from "@/lib/api/projects";

// Route segment config
export const runtime = "edge";

export const size = {
  width: 600,
  height: 800,
};

export const contentType = "image/jpg";

export default async function OpenGraphImage({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  const { heroImage } = project;

  return new ImageResponse(
    (
      <img
        src={heroImage.url}
        width={size.width}
        height={size.height}
        style={{
          objectFit: "contain",
        }}
      />
    ),
    {
      ...size,
    },
  );
}
