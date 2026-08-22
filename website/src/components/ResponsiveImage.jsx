import { imageSet } from "../imageSet";

export default function ResponsiveImage({
  prefix,
  alt,
  sizes,
  className,
  loading = "lazy",
  fetchPriority,
}) {
  const { jpgSrcSet, webpSrcSet, fallback } = imageSet(prefix);

  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={fallback}
        srcSet={jpgSrcSet}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
