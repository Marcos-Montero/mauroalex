export default function Loading() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="relative animate-pulse">
        <div className="w-12 h-12 rounded-full animate-spin border-y border-solid border-white bg-red-200/20 shadow-[0_0_50px_rgba(255,255,255,.8)] border-t-transparent shadow-md"></div>
      </div>
    </main>
  );
}
