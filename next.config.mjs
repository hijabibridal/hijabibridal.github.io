/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // Required for GitHub Pages
  images: {
    unoptimized: true,   // GitHub Pages doesn't support the Next.js Image Optimization API
  },
  // If your repo is named 'hijabibridal.github.io', 
  // you usually don't need basePath. 
  // But if it's a project page like 'username.github.io/repo-name', 
  // you'd add: basePath: '/repo-name',
};

export default nextConfig;