import { Skeleton, SkeletonText } from "@/components/Skeleton";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative pt-24 pb-12 px-6 min-h-screen bg-[#030014]">
      <div className="max-w-6xl mx-auto">

        {/* Plan Header Skeleton - Ultra Compact */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="hidden xs:block w-9 h-9 rounded-lg" />
              <div>
                <Skeleton className="h-5 w-32 sm:h-6 sm:w-40 mb-2" />
                <Skeleton className="h-2 w-20" />
              </div>
            </div>
            <Skeleton className="w-20 h-9 sm:w-24 sm:h-10 rounded-lg" />
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
            <SkeletonText className="w-full" />
            <SkeletonText className="w-3/4" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Carousel Skeleton */}
          <div className="space-y-8 h-full">
            <Skeleton className="aspect-video w-full rounded-3xl" />
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
              <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
              <div className="flex-grow space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>

          {/* Right Column: Payment Skeleton */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl space-y-6">
            <Skeleton className="h-8 w-1/2" />
            <div className="space-y-4">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="mt-12 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
