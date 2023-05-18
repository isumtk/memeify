import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from '../../utils/debounce';
import { BlockPicker } from 'react-color';
import FontSelector from './font-selector';
import BgSelector from './bg-selector';

const TextItem = ({ textObject, deleteText }) => {
	const [textValue, setTextValue] = useState(textObject.text);
	const [isEdit, setIsEdit] = useState(false);

	const [textColor, setTextColor] = useState(
		textObject.color === 'default' ? '#000000' : textObject.color
	);
	const [fontFamily, setFontFamily] = useState(
		textObject.fontFamily === 'default' ? 'Oswald' : textObject.fontFamily
	);

	const [textBg, setTextBg] = useState(textObject.textBg);
	const [isBold, setIsBold] = useState(textObject.bold);

	const handleEdit = useCallback(() => {
		debounce(setIsEdit((edit) => !edit));
	}, [setIsEdit]);

	const handleColorChange = useCallback(
		(color) => {
			if (isEdit) {
				const { hex } = color;
				setTextColor(hex);
			}
		},
		[isEdit, setTextColor]
	);

	useEffect(() => {
		console.log({ textBg });
	}, [textBg]);

	return (
		<div className="flex h-auto w-full flex-col gap-2 rounded border border-gray-500 bg-gray-400 p-2">
			<div className="flex flex-1 items-center justify-between gap-1 rounded bg-white">
				<input
					type="text"
					value={textValue}
					onChange={(e) => setTextValue(e.target.value)}
					readOnly={!isEdit}
					className="h-10 flex-1 rounded bg-inherit px-2 py-1 text-base outline-none"
				/>
				<button
					onClick={handleEdit}
					className="mr-1 flex aspect-auto h-full items-center justify-center"
				>
					{isEdit ? (
						<ion-icon name="lock-open" style={{ fontSize: '24px' }}></ion-icon>
					) : (
						<ion-icon
							name="lock-closed"
							style={{ fontSize: '24px' }}
						></ion-icon>
					)}
				</button>
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-sm">Font Color :</p>
				<BlockPicker
					color={textColor}
					triangle="hide"
					width="100%"
					onChangeComplete={handleColorChange}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-sm">Font Family :</p>
				<FontSelector fontFamily={fontFamily} setFontFamily={setFontFamily} />
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-sm">Text Background :</p>
				<BgSelector textBg={textBg} setTextBg={setTextBg} />
			</div>
			<div className="flex items-center justify-end gap-2">
				<button
					onClick={() => setIsBold(!isBold)}
					className={`flex aspect-square h-8 items-center justify-center rounded border-2 border-black transition-colors ${
						isBold && 'text-red bg-black text-white'
					}`}
				>
					<p className="font-medium">B</p>
				</button>
				<button
					onClick={() => deleteText(textObject.id)}
					className="flex aspect-square h-8 items-center justify-center"
				>
					<ion-icon
						name="trash"
						style={{ fontSize: '20px', color: 'rgb(239, 68, 68)' }}
					></ion-icon>
				</button>
			</div>
		</div>
	);
};

TextItem.propTypes = {
	textObject: PropTypes.object,
	deleteText: PropTypes.func,
};

export default TextItem;
