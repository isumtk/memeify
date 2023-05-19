import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const allowedExtentions = ['jpeg', 'jpg', 'png'];

const DefaultMenu = () => {
	const [isUpload, setIsUpload] = useState(false);
	const [fileName, setFileName] = useState('');
	const [file, setFile] = useState({});
	const [error, setError] = useState('');
	const [memes, setMemes] = useState();

	const validatFile = useCallback(() => {
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
	}, [file, setError, setFileName]);

	const handleSelectFile = useCallback(
		(e) => {
			const files = e.target.files;
			if (files?.length > 0) {
				setFile(files[0]);
			}
		},
		[setFile]
	);

	const fetchMemes = useCallback(async () => {
		try {
			const response = await axios.get('https://api.imgflip.com/get_memes');
			setMemes(response.data);
		} catch (error) {
			console.log('Error fetching the memes');
		}
	}, []);

	const memoizedMemes = useMemo(() => memes, [memes]);
	useEffect(() => {
		fetchMemes();
	}, [fetchMemes]);

	useEffect(() => {
		console.log({ memoizedMemes });
	}, [memoizedMemes]);

	useEffect(() => {
		console.log(file?.name);
	}, [file]);

	return (
		<section className="flex h-full w-full flex-col gap-2 overflow-y-auto overflow-x-clip bg-gray-900 p-3">
			<section className="flex w-full flex-col items-center">
				<div className="flex w-full items-center gap-2 font-normal text-emerald-400">
					<button
						onClick={() => setIsUpload(false)}
						className={`flex h-11 flex-1 items-center justify-center transition-all ${
							!isUpload && 'font-medium text-emerald-500'
						}`}
					>
						Browse
					</button>
					<button
						onClick={() => setIsUpload(true)}
						className={`flex h-11 flex-1 items-center justify-center transition-all ${
							isUpload && 'font-medium text-emerald-500'
						}`}
					>
						Select
					</button>
				</div>
				<div className="relative h-1 w-full">
					<span
						className={`absolute h-full w-1/2 rounded-md bg-emerald-600 transition-transform ${
							isUpload && 'translate-x-full'
						}`}
					/>
				</div>
			</section>
			<div className="relative flex w-full flex-1 overflow-x-clip rounded bg-inherit">
				<section
					className={`absolute flex h-full w-full overflow-y-auto bg-inherit transition ${
						isUpload ? '-translate-x-full' : 'translate-x-0'
					}`}
				>
					<div className="flex flex-1 flex-col gap-3 overflow-clip bg-inherit px-1 py-2">
						{/* <div className="flex w-full items-center gap-2 rounded bg-white">
							<input
								type="text"
								placeholder="Surprised Pikachu"
								className="flex-1 rounded-s p-2 outline-none"
							/>
							<button className="flex aspect-square h-full items-center justify-center">
								<ion-icon
									name="search-sharp"
									style={{ fontSize: '24px' }}
								></ion-icon>
							</button>
						</div> */}
						<div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-inherit">
							{memoizedMemes?.data?.memes.length > 0
								? memoizedMemes.data.memes.map((meme) => (
										<button
											key={meme.id}
											className="group relative aspect-square w-full overflow-clip outline-none"
										>
											<img
												src={meme.url}
												className="aspect-square w-full object-cover"
											/>
											<div className="absolute -z-10 h-full w-full bg-gray-500 group-hover:z-40"></div>
										</button>
								  ))
								: ''}
						</div>
					</div>
				</section>
				<section
					className={`absolute flex h-full w-full flex-col items-center justify-center bg-inherit transition ${
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
									name="document-sharp"
									style={{ fontSize: '32px', color: 'rgb(16 185 129)' }}
								></ion-icon>
							</label>
							<button
								onClick={validatFile}
								className="text-lg font-medium text-emerald-500"
							>
								Select
							</button>
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
