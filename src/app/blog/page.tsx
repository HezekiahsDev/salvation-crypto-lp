"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CinematicBackground } from "@/components/CinematicBackground";
import { MouseFollowGlow } from "@/components/MouseFollowGlow";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { motion } from "framer-motion";

const BLOG_POSTS = [
  {
    id: "1",
    title: "Mastering the Art of Order Flow: A Guide for Advanced Traders",
    excerpt: "Understand how institutional money moves the markets and how you can position yourself alongside the giants of the industry.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80\u0026w=2832\u0026auto=format\u0026fit=crop",
    category: "Trading Strategy",
    date: "Oct 24, 2023",
    readTime: "12 min read",
    author: {
      name: "Alex Rivera",
      avatar: ""
    }
  },
  {
    id: "2",
    title: "Bitcoin Market Cycle Analysis: Where Are We Now?",
    excerpt: "An in-depth look at on-chain data and historical cycles to determine if we've reached the peak or if the moon mission is just beginning.",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80\u0026w=2938\u0026auto=format\u0026fit=crop",
    category: "Market Analysis",
    date: "Oct 22, 2023",
    readTime: "8 min read",
    author: {
      name: "Sarah Chen",
      avatar: ""
    }
  },
  {
    id: "3",
    title: "The Psychology of a Winning Trader: Overcoming FOMO",
    excerpt: "Trading is 90% mental. Learn the psychological frameworks used by elite traders to stay calm during extreme market volatility.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80\u0026w=2940\u0026auto=format\u0026fit=crop",
    category: "Psychology",
    date: "Oct 20, 2023",
    readTime: "15 min read",
    author: {
      name: "Marcus Thorne",
      avatar: ""
    }
  },
  {
    id: "4",
    title: "Understanding DeFi Liquidity Pools and Yield Farming",
    excerpt: "A beginner's guide to the complex world of Decentralized Finance and how to earn passive income while managing your risk.",
    image: "https://images.unsplash.com/photo-1633156189757-4f4938391c83?q=80\u0026w=2940\u0026auto=format\u0026fit=crop",
    category: "Crypto Education",
    date: "Oct 18, 2023",
    readTime: "10 min read",
    author: {
      name: "Elena Vance",
      avatar: ""
    }
  },
  {
    id: "5",
    title: "Technical Analysis vs. Fundamental Analysis in Crypto",
    excerpt: "Do charts really matter in a news-driven market? We explore the synergy between technical levels and core project fundamentals.",
    image: "https://images.unsplash.com/photo-1611974717483-5828fb774024?q=80\u0026w=2942\u0026auto=format\u0026fit=crop",
    category: "Trading Strategy",
    date: "Oct 15, 2023",
    readTime: "14 min read",
    author: {
      name: "Alex Rivera",
      avatar: ""
    }
  },
  {
    id: "6",
    title: "Introducing Salvation Elite: Our Newest Mentorship Tier",
    excerpt: "We're expanding the academy! Discover what's included in our most comprehensive trading program yet.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80\u0026w=2940\u0026auto=format\u0026fit=crop",
    category: "Academy Updates",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    author: {
      name: "Management",
      avatar: ""
    }
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");

  const filteredPosts = activeCategory === "All Articles" 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <>
      <CinematicBackground />
      <MouseFollowGlow />
      <Navigation />
      
      <main className="relative z-10 min-h-screen bg-[#020010]">
        <BlogHero />
        
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <BlogFilters 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          
          {filteredPosts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No articles found in this category.</p>
            </div>
          )}
          
          {/* Load More Button */}
          <div className="flex justify-center mt-20">
            <button className="group relative px-8 py-4 bg-white/[0.03] border border-white/10 rounded-2xl text-white font-bold hover:bg-white/[0.05] transition-all active:scale-95">
              <span className="relative z-10">Load More Insights</span>
              <div className="absolute inset-0 bg-blue-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            </button>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative py-32 border-t border-white/5 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Never Miss a <span className="gradient-text">Market Shift</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              Join 12,000+ traders getting our weekly analysis, institutional insights, 
              and exclusive trading strategies delivered straight to their inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-grow bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
              />
              <button className="btn-primary py-4 px-8 whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <p className="text-xs text-slate-600 mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
