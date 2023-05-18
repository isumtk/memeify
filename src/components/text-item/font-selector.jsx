import React from 'react';
import { fonts } from './fonts';
import PropTypes from 'prop-types';

const FontSelector = ({ fontFamily, setFontFamily }) => {
	return (
		<select
			className="flex items-center rounded bg-white p-2 text-base font-normal"
			defaultValue={fontFamily}
			onChange={(e) => {
				const idx = e.target.selectedIndex;
				const font = fonts[idx];
				const loaded = font.load();
				loaded.then((font) => {
					const fontInfo = font.getInfo();
					const { fontFamily: fFamily } = fontInfo;
					setFontFamily(fFamily);
				});
			}}
		>
			{fonts.map((font) => (
				<option key={font.family} value={font.family}>
					{font.family}
				</option>
			))}
		</select>
	);
};

FontSelector.propTypes = {
	fontFamily: PropTypes.string,
	setFontFamily: PropTypes.func,
};

export default FontSelector;
