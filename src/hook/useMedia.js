import { useEffect } from 'react';

export const useMedia = () => {
	let wid = 0;
	const getClienWid = () => {
		wid = window.innerWidth;
		console.log(wid);
	};
	useEffect(() => {
		window.addEventListener('resize', getClienWid);
	}, []);
};
