import React, { useCallback, useState } from 'react';
import { debounce } from '../../utils/debounce';
import TextMenu from './menus/text-menu';
import DefaultMenu from './menus/default-menu';

const menuButtons = [
	{ name: 'browsers-sharp' },
	{ name: 'pencil-sharp' },
	{ name: 'text-sharp' },
	{ name: 'image-sharp' },
	{ name: 'extension-puzzle-sharp' },
];

const MenuSide = () => {
	const [menuState, setMenuState] = useState(menuButtons[0].name);
	const activateMenu = useCallback(
		(name) => {
			debounce(setMenuState(name));
		},
		[setMenuState]
	);

	return (
		<aside className="relative flex h-full items-center rounded-s">
			<div className="flex h-full w-14 flex-col items-center gap-2 bg-gray-800 pt-1">
				{menuButtons.map((button) => (
					<button
						onClick={() => activateMenu(button.name)}
						className={`flex aspect-square w-12 items-center justify-center rounded border-transparent transition ${
							menuState === button.name && 'bg-emerald-600'
						}`}
						key={button.name}
					>
						<ion-icon
							name={button.name}
							style={{
								fontSize: '24px',
								transition: 'transform 0.1s ease',
								color: 'rgb(255,255,255)',
							}}
						></ion-icon>
					</button>
				))}
			</div>
			<div className="h-full w-80 bg-inherit transition">
				{menuState === menuButtons[0].name && <DefaultMenu />}
				{menuState === menuButtons[2].name && <TextMenu />}
			</div>
		</aside>
	);
};

export default MenuSide;
