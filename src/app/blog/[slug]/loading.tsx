import { Skeleton, SkeletonText } from "@/components/Skeleton";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative z-10 min-h-screen bg-[#020010] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button Skeleton */}
        <div className="flex items-center gap-2 mb-12 opacity-50">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
            <ArrowLeft size={16} className="text-slate-600" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Hero Skeleton */}
        <div className="mb-12">
          <Skeleton className="h-6 w-32 mb-6 rounded-full" />
          <Skeleton className="h-16 w-full mb-8" />
          
          <div className="flex items-center justify-between py-8 border-y border-white/5">
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="flex gap-8">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <Skeleton className="h-[300px] md:h-[500px] w-full rounded-[2rem] mb-16" />

        {/* Content Skeleton */}
        <div className="space-y-6">
          <SkeletonText className="h-6" />
          <SkeletonText />
          <SkeletonText className="w-5/6" />
          <SkeletonText className="w-4/6" />
          <div className="py-10">
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
          <SkeletonText />
          <SkeletonText />
        </div>
      </div>
    </main>
  );
}
