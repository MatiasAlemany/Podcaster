import Link from "next/link";

export const Nav = () => {
  return (
    <div className="flex flex-col items-center bg-white py-4 shadow-md">
      <Link href="/">
        <h1 className="text-blue-500 font-bold text-3xl transition-transform duration-300 hover:scale-110 hover:text-blue-700">
          Podcaster
        </h1>
      </Link>
      <hr className="w-20 h-px bg-gray-400 border-0 mt-2 mb-4 shadow-lg" />
    </div>
  );
};
