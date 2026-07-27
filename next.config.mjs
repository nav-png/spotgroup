/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      { source: "/listings", destination: "/buy", permanent: true },
      { source: "/new-listings", destination: "/buy/recently-listed", permanent: true },
      { source: "/sell-as-is", destination: "/sell#cash-offer", permanent: true },
      { source: "/services", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
