import React from 'react';
import PropTypes from 'prop-types';

const backgrounds = [
	{ name: 'White', value: '#ffffff' },
	{ name: 'Yellow', value: '#DCE775' },
	{ name: 'Black', value: '#000000' },
	{ name: 'Transparent', value: '' },
];

const BgSelector = ({ textBg, setTextBg }) => {
	return (
		<select
			className="flex items-center rounded bg-white p-2 text-base font-normal"
			defaultValue={backgrounds[textBg].value}
			onChange={(e) => {
				const idx = e.target.selectedIndex;
				setTextBg(idx);
			}}
		>
			{backgrounds.map((bg) => (
				<option key={bg.value} value={bg.value}>
					{bg.name}
				</option>
			))}
		</select>
	);
};

BgSelector.propTypes = {
	textBg: PropTypes.number,
	setTextBg: PropTypes.func,
};

export default BgSelector;
