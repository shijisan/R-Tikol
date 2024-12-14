export default function HomePage() {
	return (
		<>

			<main className="max-w-6xl bg-white border shadow m-auto z-0 pt-[10vh]">
				<header className="min-h-screen flex">
					<div className="w-2/3 flex flex-col h-full gap-4">
						<div className="flex h-1/2">
							<div className="w-1/3 p-8 flex flex-col font-semibold space-y-2 justify-center bg-black text-white">

								<h1 className="text-xl font-serif text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>

								<h4 className="text-base">Date of publication here</h4>

								<p className="text-lg font-normal text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>
							</div>
							<div className="w-2/3">
								<img src="https://placehold.co/400x300/webp" className="w-full h-full" alt="" />
							</div>
						</div>
						<div className="h-1/2 grid grid-cols-3 grid-rows-1 gap-4 ps-4">
							<div className="flex flex-col w-full">
								<img className="w-full" src="https://placehold.co/100/webp" alt="" />
								<div className="p-4">
									<h2 className="text-justify font-medium font-serif mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h2>
									<h4 className="text-sm">Date of publication here</h4>
								</div>
							</div>
							<div className="flex flex-col w-full">
								<img className="w-full" src="https://placehold.co/100/webp" alt="" />
								<div className="p-4">
									<h2 className="text-justify font-medium font-serif mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h2>
									<h4 className="text-sm">Date of publication here</h4>
								</div>
							</div>
							<div className="flex flex-col w-full">
								<img className="w-full" src="https://placehold.co/100/webp" alt="" />
								<div className="p-4">
									<h2 className="text-justify font-medium font-serif mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h2>
									<h4 className="text-sm">Date of publication here</h4>
								</div>
							</div>

						</div>

					</div>
					<div className="w-1/3 flex flex-col">
						<h1 className="text-center font-semibold text-xl my-2">MOST READ</h1>
						<div className="w-full flex justify-center">
							<ol className="flex flex-col justify-center w-1/2 list-decimal list-outside space-y-8">
								<li className="">
									<h4 className="text-red-600 font-medium">Category</h4>
									<h1 className="text-justify font-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h1>
								</li>
								<li className="">
									<h4 className="text-red-600 font-medium">Category</h4>
									<h1 className="text-justify font-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h1>
								</li>
								<li className="">
									<h4 className="text-red-600 font-medium">Category</h4>
									<h1 className="text-justify font-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h1>
								</li>
								<li className="">
									<h4 className="text-red-600 font-medium">Category</h4>
									<h1 className="text-justify font-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h1>
								</li>
								<li className="">
									<h4 className="text-red-600 font-medium">Category</h4>
									<h1 className="text-justify font-serif">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h1>
								</li>
							</ol>
						</div>
					</div>
				</header>
			</main>
		</>
	)
}