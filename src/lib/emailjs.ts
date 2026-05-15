export const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_iillzan";

export const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "IPs4UgCqUDWrATTWU";

export const EMAILJS_TEMPLATES = {
  internalNotification: "template_d1l12yq",
  autoReply: "template_0qbsv13",
} as const;

