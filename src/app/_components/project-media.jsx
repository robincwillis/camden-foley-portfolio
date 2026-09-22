import Image from "next/image";

const isVideo = (contentType) => Boolean(contentType?.startsWith("video/"));

// Renders a project section image, or a native <video> in its place when the
// Contentful asset's content type is a video (e.g. mp4). `controls` toggles
// between an interactive player (main slides) and a silent, looping preview
// (grid thumbnails, where native controls would conflict with tap-to-expand).
export default function ProjectMedia({
  src,
  contentType,
  width,
  height,
  alt,
  style,
  className,
  priority,
  sizes,
  controls = true,
}) {
  if (isVideo(contentType)) {
    return (
      <video
        src={src}
        width={width}
        height={height}
        style={style}
        className={className}
        controls={controls}
        autoPlay={!controls}
        muted={!controls}
        loop={!controls}
        playsInline
        preload="metadata"
        aria-label={alt || undefined}
      />
    );
  }

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt || ""}
      style={style}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
