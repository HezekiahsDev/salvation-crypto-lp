import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-white/[0.05] rounded-xl overflow-hidden relative ${className}`}
    >
      <div className="absolute inset-0 animate-shimmer" />
    </div>
  );
};

export const SkeletonText = ({ className = "" }: { className?: string }) => (
  <Skeleton className={`h-4 w-full mb-2 ${className}`} />
);

export const SkeletonCircle = ({ className = "" }: { className?: string }) => (
  <Skeleton className={`rounded-full ${className}`} />
);

export const SectionLoading = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="flex flex-col items-center mb-16">
      <Skeleton className="h-4 w-32 mb-6 rounded-full" />
      <Skeleton className="h-12 w-2/3 mb-4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      <Skeleton className="h-80 w-full rounded-3xl" />
      <Skeleton className="h-80 w-full rounded-3xl" />
      <Skeleton className="h-80 w-full rounded-3xl" />
    </div>
  </section>
);
