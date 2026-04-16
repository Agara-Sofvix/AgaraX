'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/Button";
import { BlogPost } from "@/lib/blog/posts";

export function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white min-h-screen">
      {/* Post Header */}
      <header className="py-20 lg:py-32 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href="/blog"
            className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-[#4F46E5] mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          <main className="lg:w-full prose prose-lg prose-indigo max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <div className="mt-20 pt-12 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Recommended CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="bg-[#4F46E5] rounded-[40px] p-8 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')]"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10 leading-tight">
              Ready to implement these insights in your business?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto relative z-10">
              Work with the team that understands high-performance development and AI-driven growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center sm:items-center relative z-10">
              <Button href="/get-started" variant="secondary" size="lg" className="!bg-white !text-[#4F46E5] hover:!bg-gray-100 w-full sm:w-64">
                Book a Strategy Session
              </Button>
              <Button href="tel:+919498069292" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#4F46E5] w-full sm:w-64">
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
