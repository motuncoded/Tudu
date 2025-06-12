// components/SkeletonLoader.jsx
const TodoLoader = () => {
  return (
    <section className="">
      <div className="w-full space-y-4">
        <div className="flex gap-4">
          <div className="skeleton h-2 w-100%"></div>
          <div className="skeleton h-8 flex-grow"></div>
          <div className="skeleton h-8 w-24"></div>
          <div className="skeleton h-8 w-16"></div>
        </div>

        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex gap-4">
            <div className="skeleton h-12 w-16"></div>
            <div className="skeleton h-12 flex-grow"></div>
            <div className="skeleton h-12 w-24"></div>
            <div className="skeleton h-12 w-16"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodoLoader;
