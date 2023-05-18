import React, { useCallback, useState } from 'react';
import TextItem from '../../../text-item';
import uuid4 from 'uuid4';

const defaultText = {
	color: 'default',
	text: 'Enter meme text here',
	textBg: 3,
	fontFamily: 'default',
	bold: false,
	xPos: '50%',
	yPos: '50%',
};

const TextMenu = () => {
	const [memeTexts, setMemeTexts] = useState([]);
	const addText = useCallback(
		(textObject) => {
			setMemeTexts((prevTexts) => [
				...prevTexts,
				{ ...textObject, id: uuid4() },
			]);
		},
		[setMemeTexts]
	);

	const deleteText = useCallback(
		(id) => {
			const newTexts = memeTexts.filter((memeText) => memeText.id !== id);
			setMemeTexts(newTexts);
		},
		[setMemeTexts, memeTexts]
	);

	return (
		<section className="flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-clip bg-stone-200 p-3">
			<button
				onClick={() => addText({ ...defaultText, bold: true })}
				className="
        rounded border-2
      border-gray-800
      bg-neutral-300
        px-4 py-2 text-xl
        font-medium text-black
        transition hover:bg-neutral-50"
			>
				Add Heading
			</button>
			<button
				onClick={() => addText(defaultText)}
				className="
        rounded border-2
      border-gray-800
      bg-gray-300
        px-4 py-2 text-base
        font-normal text-black
        transition hover:bg-neutral-50"
			>
				Add text
			</button>
			<div className="flex w-full flex-1 flex-col gap-5 rounded-md bg-inherit">
				{memeTexts.length === 0 ? (
					<div className="flex w-full flex-1 flex-col items-center justify-center gap-2 rounded-md bg-gray-200">
						<p className="w-full text-center text-lg">
							Feels so empty here
							<br /> Add some text
						</p>
						<button onClick={() => addText(defaultText)}>
							<ion-icon
								name="add-circle-sharp"
								style={{ fontSize: '40px' }}
							></ion-icon>
						</button>
					</div>
				) : (
					memeTexts.map((textObject) => (
						<TextItem
							key={textObject.id}
							textObject={textObject}
							deleteText={deleteText}
						/>
					))
				)}
			</div>
		</section>
	);
};

export default TextMenu;
