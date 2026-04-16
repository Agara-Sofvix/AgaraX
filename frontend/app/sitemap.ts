import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo/metadata';
import { CATEGORIES } from './(main)/products/data';
import { LANDING_PAGES } from '@/lib/seo/landingPages';
import { BLOG_POSTS } from '@/lib/blog/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/services',
    '/products',
    '/about',
    '/careers',
    '/get-started',
    '/blog',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const dynamicServices = CATEGORIES.flatMap((category) =>
    (category.capabilities || []).map((service) => ({
      url: `${BASE_URL}/services/${category.slug}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  const landingPages = Object.keys(LANDING_PAGES).map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPosts = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...dynamicServices, ...landingPages, ...blogPosts];
}
