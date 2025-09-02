/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'kacnbldprojrqsdujlyl.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/cabin-images/**',
            },
        ],
          domains: ['lib.googleusercontent.com'],
    },
    // output: 'export'
};

export default nextConfig;
