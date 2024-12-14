import Link from "next/link"

export default function NavBar() {


	return (
		<>
			<nav className="flex h-[10vh] text-black shadow z-10 absolute top-0 w-full">
				<div className="w-1/2 flex justify-center items-center bg-white">
					<h2 className="text-red-600 text-4xl font-bold">R-TIKOL</h2>
				</div>
				<ul className="w-1/2 flex justify-evenly items-center bg-red-600 text-white">
					<li>
						<Link href={"/"} className="hover:underline">
							Home
						</Link>
					</li>
					<li>
						<Link href={"/"} className="hover:underline">
							Home
						</Link>
					</li>
					<li>
						<Link href={"/"} className="hover:underline">
							Home
						</Link>
					</li>
					<li>
						<Link href={"/"} className="hover:underline">
							Home
						</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}