import React, { useCallback, useEffect, useState } from 'react';
const allowedExtentions = ['jpeg', 'jpg', 'png'];

const DefaultMenu = () => {
	const [isUpload, setIsUpload] = useState(false);
	const [fileName, setFileName] = useState('');
	const [file, setFile] = useState({});
	const [error, setError] = useState('');

	const validatFile = () => {
		setError('');
		try {
			const { name } = file;
			const fileSplit = name.split('.');
			if (fileSplit.length > 2) {
				throw new Error('Invalid file');
			} else {
				const isValid = allowedExtentions.includes(fileSplit[1].toLowerCase());
				if (!isValid) {
					throw new Error('Invalid format');
				} else {
					setFileName(name);
				}
			}
		} catch (error) {
			if (error.message === 'Invalid file') {
				setError('"." is not allowed in filename');
			} else if (error.message === 'Invalid format') {
				setError('Format is not supported');
			}
		}
	};

	const handleSelectFile = (e) => {
		const files = e.target.files;
		if (files?.length > 0) {
			setFile(files[0]);
		}
	};

	useEffect(() => {
		console.log({ error });
	}, [error]);

	useEffect(() => {
		console.log(file?.name);
	}, [file]);

	return (
		<section className="flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-clip bg-stone-200 p-3">
			<section className="flex w-full flex-col items-center">
				<div className="flex w-full items-center gap-2 font-normal text-gray-700">
					<button
						onClick={() => setIsUpload(false)}
						className={`flex h-11 flex-1 items-center justify-center transition-all ${
							!isUpload && 'font-medium text-blue-500'
						}`}
					>
						Browse
					</button>
					<button
						onClick={() => setIsUpload(true)}
						className={`flex h-11 flex-1 items-center justify-center transition-all ${
							isUpload && 'font-medium text-blue-500'
						}`}
					>
						Select
					</button>
				</div>
				<div className="relative h-1 w-full">
					<span
						className={`absolute h-full w-1/2 rounded-md bg-blue-600 transition-transform ${
							isUpload && 'translate-x-full'
						}`}
					/>
				</div>
			</section>
			<div className="relative flex w-full flex-1 overflow-x-clip rounded bg-white">
				<section
					className={`absolute flex h-full w-full overflow-y-auto bg-rose-300 transition ${
						isUpload ? '-translate-x-full' : 'translate-x-0'
					}`}
				></section>
				<section
					className={`absolute flex h-full w-full flex-col items-center justify-center bg-fuchsia-400 transition ${
						isUpload ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					<div className="flex w-full flex-col items-center gap-2">
						<div className="flex flex-col items-center gap-2">
							<input
								type="file"
								id="select_file"
								hidden
								accept="image/png, image/jpg, image/jpeg"
								onChange={handleSelectFile}
							></input>
							<label htmlFor="select_file" className="flex items-center gap-2">
								<ion-icon
									name="document-outline"
									style={{ fontSize: '24px' }}
								></ion-icon>
							</label>
							<button onClick={validatFile}>Select</button>
						</div>
						<p
							className={`w-4/5 text-center text-sm opacity-0 transition-opacity ${
								(error || (!error && fileName)) && 'opacity-100'
							}`}
						>
							{error || fileName}
						</p>
					</div>
				</section>
			</div>
		</section>
	);
};

export default DefaultMenu;
