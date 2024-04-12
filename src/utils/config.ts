import { Metadata } from "next";

export const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "";
export const siteAddress =
  process.env.NEXT_PUBLIC_SITE_ADDRESS ?? "http://localhost:3000";
export const appLogo = `${siteAddress}/logo.png`;

export const API_ROOT = `${siteAddress}/api/`;

export const IMAGE_CDN_ROOT = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`;
export const CN_THUMBNAIL_CONF = "c_thumb,w_200,g_face"; // For Thumbnails


export const SITE_DESCRIPTION = `Welcome to ${appName} – your one-stop solution`;

export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(siteAddress),
  title: appName,
  description: SITE_DESCRIPTION,
  keywords:
    "bills",
  openGraph: {
    type: "website",
    title: appName,
    description: SITE_DESCRIPTION,
    url: siteAddress,
    images: appLogo,
  },
};
