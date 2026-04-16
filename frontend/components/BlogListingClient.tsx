'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Clock, User, Tag } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog/posts";

export function BlogListingClient() {
  return (
    <div className="bg-white min-h-screen">
      {/* Blog Hero */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Insights for <span className="text-[#4F46E5]">Modern Businesses</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Explore our latest thoughts on software development, AI automation, and startup growth strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {BLOG_POSTS.map((post, index) => (
              <motion.article 
                key={post.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="block relative h-64 overflow-hidden"
                  aria-label={`Read more about ${post.title}`}
                >
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                    {/* Placeholder for real images - using title as accessible label */}
                    <Tag className="w-12 h-12 opacity-20" aria-hidden="true" />
                    <span className="sr-only">{post.title}</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#4F46E5] z-10">
                    {post.category}
                  </div>
                </Link>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#4F46E5] transition-colors leading-tight">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-500 mb-8 line-clamp-3 text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-2 text-[#4F46E5] font-bold text-sm group/link"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-[#1E293B] text-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay ahead of the curve</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Subscribe to our newsletter for exclusive insights on AI and scalable development.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 flex-grow focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
            <button className="bg-[#4F46E5] text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
