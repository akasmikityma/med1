/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,  // Enable server actions for form handling
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',  // Required for Google Auth profile images
      'via.placeholder.com'         // For placeholder images in development
    ],
  }
}

module.exports = nextConfig