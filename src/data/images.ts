/** Intrinsic sizes of images in /public, so the browser can reserve space (no layout shift). */
export const IMAGE_SIZES: Record<string, { width: number; height: number }> = {
  "/images/carpentry-work.webp": { width: 1200, height: 800 },
  "/images/kitchen-renovation.webp": { width: 1200, height: 800 },
  "/images/renovation-ladder.webp": { width: 1400, height: 932 },
  "/images/tile-work.webp": { width: 933, height: 1400 },
  "/images/tools-detail.webp": { width: 933, height: 1400 },
  "/images/tools-rack.webp": { width: 1200, height: 800 },
  "/images/site-team.webp": { width: 1200, height: 800 },
  "/images/bath-after.webp": { width: 1376, height: 768 },
  "/images/bath-before.webp": { width: 1376, height: 768 },
  "/images/kitchen-after.webp": { width: 1376, height: 768 },
  "/images/kitchen-before.webp": { width: 1376, height: 768 },
  "/images/living-after.webp": { width: 1376, height: 768 },
  "/images/living-before.webp": { width: 1376, height: 768 },
  "/projectfoto-volgt.webp": { width: 1200, height: 800 },
}

export function imageSize(src: string): { width?: number; height?: number } {
  return IMAGE_SIZES[src] ?? {}
}
