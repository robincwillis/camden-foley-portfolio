import { ImageResponse } from "next/og";
import Image from "next/image";

import { getPage } from "@/lib/api/pages";

// Route segment config
export const runtime = "edge";

export const size = {
  width: 800,
  height: 800,
};

export const contentType = "image/jpg";

export default async function OpenGraphImage({ params }) {
  const page = await getPage("info");
  const lockup = page?.sectionsCollection?.items[0];

  return new ImageResponse(
    (
      <img
        src={lockup.image.url}
        width={size.width}
        height={size.height}
        style={{
          objectFit: "cover",
        }}
      />
    ),
    {
      ...size,
    },
  );
}
