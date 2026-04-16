import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AgaraX | Engineering Scalable Digital Products',
    short_name: 'AgaraX',
    description: 'We build enterprise-grade software solutions that drive growth, enhance efficiency, and transform businesses globally.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#4F46E5',
    icons: [
      {
        src: '/logo-v3.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
