import Link from "next/link";

export const Nav = () => {
  return (
    <div className="mb-4 flex flex-col items-center bg-white dark:bg-[#d6d6d6] py-4 shadow-md text-center justify-center">
      <Link href="/">
        <h1 className="text-blue-400 font-sans font-bold text-5xl transition-transform duration-300 hover:scale-110 hover:text-blue-700">
          TOP #100 ITUNES PODCASTER
        </h1>
      </Link>
      <hr className="w-20 h-px bg-gray-400 border-0 mt-2 mb-4 shadow-lg" />
    </div>
  );
};
