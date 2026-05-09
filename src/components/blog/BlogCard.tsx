import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight, ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    author: {
      name: string;
      avatar: string;
    };
  };
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.05] transition-all duration-500 hover:border-blue-500/20"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Container */}
      <Link href={`/blog/${post.slug}`} className="relative h-56 overflow-hidden block">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020010] via-transparent to-transparent opacity-60" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-blue-600 rounded-full shadow-lg shadow-blue-900/50">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 relative z-10">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-[11px] text-slate-500 font-medium uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-blue-400" />
            {post.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-blue-400" />
            {post.readTime}
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
              ) : (
                post.author.name.charAt(0)
              )}
            </div>
            <span className="text-xs font-semibold text-slate-300">
              {post.author.name}
            </span>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors uppercase tracking-widest"
          >
            Read More
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

