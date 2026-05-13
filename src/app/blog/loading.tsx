import { Skeleton, SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="relative z-10 min-h-screen bg-[#020010] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Blog Hero Skeleton */}
        <div className="text-center mb-20">
          <Skeleton className="h-4 w-32 mx-auto mb-6 rounded-full" />
          <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-3xl border border-white/5 overflow-hidden bg-white/[0.02]">
              <Skeleton className="h-64 w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full" />
                <SkeletonText />
                <div className="flex justify-between items-center pt-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
