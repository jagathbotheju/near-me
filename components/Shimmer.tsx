const Shimmer = () => {
  return (
    <div className="card card-side shadow-xl gap-4 w-[70%] my-5">
      <div className="animate-pulse flex space-x-4 w-full">
        <div className="bg-slate-200 h-[100px] w-[200px]"></div>

        <div className="flex flex-col w-full space-y-2 mt-5">
          <div className="bg-slate-200 h-3 rounded w-[50%]" />
          <div className="bg-slate-200 h-2 rounded w-[80%]" />
          <div className="bg-slate-200 h-2 rounded w-[20%]" />
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
