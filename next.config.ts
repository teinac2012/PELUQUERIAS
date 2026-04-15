import type { NextConfig } from "next";

const githubRepo = process.env.GITHUB_REPOSITORY || "";
const [githubOwner, githubName] = githubRepo.split("/");
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isUserOrOrgSite =
  githubName?.toLowerCase() === `${githubOwner || ""}.github.io`;

const repoBasePath =
  isGithubActions && githubName && !isUserOrOrgSite ? `/${githubName}` : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  trailingSlash: true,
  basePath: repoBasePath,
  assetPrefix: repoBasePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
