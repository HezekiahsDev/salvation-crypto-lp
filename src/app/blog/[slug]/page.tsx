"use client";

import { useParams, useRouter } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog-posts";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CinematicBackground } from "@/components/CinematicBackground";
import { MouseFollowGlow } from "@/components/MouseFollowGlow";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

// Custom brand icons
const Twitter = ({ size = 24, ...props }: { size?: number; [key: string]: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Facebook = ({ size = 24, ...props }: { size?: number; [key: string]: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020010] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-blue-400 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <CinematicBackground />
      <MouseFollowGlow />
      <Navigation />

      <main className="relative z-10 min-h-screen bg-[#020010] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-medium uppercase tracking-widest">Back to Insights</span>
          </motion.button>

          {/* Hero Section */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20 mb-6">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1]">
                {post.title}
              </h1>

              {/* Author and Meta */}
              <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg overflow-hidden border-2 border-white/10">
                    {post.author.avatar ? (
                      <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                    ) : (
                      post.author.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="text-white font-bold">{post.author.name}</p>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Senior Analyst</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Calendar size={16} className="text-blue-500" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock size={16} className="text-blue-500" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative h-[300px] md:h-[500px] rounded-[2rem] overflow-hidden mb-16 border border-white/5"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020010] via-transparent to-transparent opacity-40" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-invert prose-blue max-w-none mb-20"
          >
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </motion.div>

          {/* Footer / Share */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 py-12 border-t border-white/5"
          >
            <div className="flex items-center gap-4">
              <span className="text-slate-500 text-sm uppercase tracking-widest font-bold">Share this Insight</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  <Twitter size={18} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  <Facebook size={18} />
                </button>
                <button className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                  <LinkIcon size={18} />
                </button>
              </div>
            </div>

            <Link href="/blog" className="btn-secondary py-3 px-8 text-sm">
              Explore More Articles
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .blog-content h2 {
          font-size: 2.25rem;
          font-weight: 700;
          color: white;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content p {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #94a3b8;
          margin-bottom: 1.5rem;
        }
        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          font-style: italic;
          font-size: 1.25rem;
          color: #e2e8f0;
          margin: 2.5rem 0;
          background: rgba(59, 130, 246, 0.05);
          padding: 2rem 1.5rem 2rem 2.5rem;
          border-radius: 0 1rem 1rem 0;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #94a3b8;
          margin-bottom: 0.75rem;
        }
        .blog-content strong {
          color: white;
          font-weight: 700;
        }
      `}</style>
    </>
  );
}
