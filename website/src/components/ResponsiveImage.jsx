import { imageSet } from "../imageSet";

// Mobile breakpoint matches the site's own --header-h/--side breakpoint
// (App.css), so the swap lines up with when the desktop hero layout kicks in.
const MOBILE_MEDIA = "(max-width: 860px)";

export default function ResponsiveImage({
  prefix,
  mobilePrefix,
  alt,
  sizes,
  mobileSizes,
  className,
  loading = "lazy",
  fetchPriority,
}) {
  const { jpgSrcSet, webpSrcSet, fallback } = imageSet(prefix);
  const mobile = mobilePrefix ? imageSet(mobilePrefix) : null;

  return (
    <picture>
      {mobile && (
        <>
          <source
            media={MOBILE_MEDIA}
            type="image/webp"
            srcSet={mobile.webpSrcSet}
            sizes={mobileSizes || sizes}
          />
          <source
            media={MOBILE_MEDIA}
            srcSet={mobile.jpgSrcSet}
            sizes={mobileSizes || sizes}
          />
        </>
      )}
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
