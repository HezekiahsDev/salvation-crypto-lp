import { Skeleton, SkeletonText } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="relative pt-32 pb-20 bg-[#020010] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block w-64 space-y-4">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="flex-grow max-w-4xl space-y-12">
          <div>
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-2">
                <SkeletonText />
                <SkeletonText />
                <SkeletonText className="w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
