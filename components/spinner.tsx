const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`relative animate-pulse flex justify-center items-center w-full ${className}`}
    >
      <div className="w-8 h-8 rounded-full animate-spin border-y border-solid border-white shadow-sm border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
