// src/components/common/SkeletonLoader.tsx
export const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white border-2 border-gray-200 rounded-lg p-6 animate-pulse h-full flex flex-col justify-between"
        >
          {/* Match Badge */}
          <div className="flex justify-end mb-2">
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          {/* Type Badge and component count */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-20 bg-gray-200 rounded-full" />
            <div className="h-4 w-12 bg-gray-100 rounded-full" />
          </div>

          {/* Title */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />

          {/* Description */}
          <div className="h-4 bg-gray-200 rounded w-full mb-4 flex-grow" />

          {/* Tags */}
          <div className="mt-auto flex gap-2 flex-wrap">
            <div className="h-6 w-16 bg-blue-100 rounded-full" />
            <div className="h-6 w-20 bg-blue-100 rounded-full" />
            <div className="h-6 w-14 bg-blue-100 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
