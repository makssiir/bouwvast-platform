/** Intrinsic sizes of images in /public, so the browser can reserve space (no layout shift). */
export const IMAGE_SIZES: Record<string, { width: number; height: number }> = {
  "/images/windows-doors.webp": { width: 1200, height: 900 },
  "/images/plumbing-installation.webp": { width: 1200, height: 900 },
  "/images/radiator-heating.webp": { width: 1200, height: 900 },
  "/images/brick-facade.webp": { width: 1200, height: 900 },
  "/images/window-removal.webp": { width: 1200, height: 900 },
  "/images/renovated-interior.webp": { width: 1200, height: 900 },
  "/images/hero-craftsmanship.webp": { width: 1200, height: 900 },
  "/images/hero-craftsmanship-720.webp": { width: 720, height: 540 },
  "/images/heat-pump.webp": { width: 1200, height: 900 },
  "/images/underfloor-heating.webp": { width: 1200, height: 900 },
  "/images/attic-conversion.webp": { width: 1200, height: 900 },
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
