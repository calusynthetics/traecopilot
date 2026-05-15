const normalizeSiteUrl = (url: string) => url.replace(/\/+$/, "");

export const BRAND = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL
    ? normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
    : "",
  logoPath: "/images/logo.png",
  emailLogoUrl:
    "https://github.com/calusynthetics/CaluSynthetic-Logo/blob/main/logo.png?raw=true",
} as const;

export const getPublicAssetUrl = (path: string, baseUrl?: string) => {
  if (!path.startsWith("/")) return path;
  const normalizedBaseUrl = baseUrl ? normalizeSiteUrl(baseUrl) : "";
  const resolvedBaseUrl = normalizedBaseUrl || BRAND.siteUrl;
  if (!resolvedBaseUrl) return path;
  return `${resolvedBaseUrl}${path}`;
};
