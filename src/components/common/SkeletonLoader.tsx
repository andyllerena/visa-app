// src/components/common/SkeletonLoader.tsx
export const SkeletonLoader = () => {
  return (
    <div className="space-y-4">
      {/* Create 3 skeleton cards */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-lg p-4 animate-pulse"
        >
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />

          {/* Description skeleton */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />

          {/* Tags skeleton */}
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded-full w-16" />
            <div className="h-6 bg-gray-200 rounded-full w-20" />
            <div className="h-6 bg-gray-200 rounded-full w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};
