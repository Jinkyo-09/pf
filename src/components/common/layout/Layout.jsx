import './Layout.scss';
import { useEffect, useRef } from 'react';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ title, children }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle, 0.1);
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);

	return (
		<section ref={refFrame} className={`layout ${title}`}>
			<figure></figure>

			<div className='content'>
				<h1 ref={refTitle}>{title}</h1>
				<div className='bar'></div>
				{children}
			</div>
		</section>
	);
}
