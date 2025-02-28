import Link from "next/link"

export const Nav = () => {

    return (
        <div>
            <Link href="/">
            <h1 className="m-4 text-blue-500 font-bold text-2xl">Podcaster</h1>
            </Link>
            <hr className="h-px bg-gray-400 border-0 shadow-2xl"/> 
        </div>
    )
}