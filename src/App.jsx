import React from 'react';
import MenuSide from './components/menu-side';

function App() {
	return (
		<div className="flex h-full w-full flex-col gap-1 bg-black">
			<header className="flex h-14 w-full items-center justify-between rounded bg-neutral-100 px-6">
				<h1 className="flex h-full items-center bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text font-medium tracking-wider text-transparent">
					Memeify
				</h1>
				<div className="flex h-full items-center gap-2"></div>
			</header>
			<div className="flex h-[calc(100vh-3.5rem-4px)] flex-1 rounded bg-indigo-100">
				<MenuSide />
				<div className="flex h-full flex-1 items-center justify-center bg-rose-400">
					<canvas width={720} height={720} className="rounded bg-white" />
				</div>
			</div>
		</div>
	);
}

export default App;
