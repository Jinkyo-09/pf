import { useRef, useEffect } from 'react';
import './Pics.scss';

function Pics() {
	const frame = useRef(null);
	const box = useRef(null);

	const handleScroll = () => {
		if (frame.current && box.current) {
			const pos = frame.current.offsetTop;
			let scroll = window.scrollY;
			let scroll2 = scroll - pos;

			if (scroll >= pos && scroll < pos + frame.current.clientHeight - window.innerWidth) {
				box.current.style.position = 'fixed';
				box.current.style.left = -scroll2 + 'px';
				box.current.style.top = '0px';
			} else if (scroll >= pos + frame.current.clientHeight - window.innerWidth) {
				box.current.style.position = 'absolute';
				box.current.style.top = frame.current.clientHeight - window.innerWidth + 'px';
				box.current.style.left = -window.innerWidth * 3 + 'px';
			} else {
				box.current.style.position = 'absolute';
				box.current.style.top = '0px';
				box.current.style.left = '0px';
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		// return () => {
		// 	window.removeEventListener('scroll', handleScroll);
		// };
	}, []);
	return (
		//섹션의 높이값은 자식 요소, 4개의 div요소의 넓이값을 합친 총합의 크기만큼 확보해야함 (그 크기만큼 Pics영역안에서 스크롤 이벤트를 발생시켜야하기 때문)

		//스크롤이 해당 Pics 영역에 도달하게 되면 Pics안쪽의 article프레임을 position: absolute에ㅓ position: fixed로 속성을 변경
		//article 브라우저 단에 새로 0px위치로 고정이 되면서 마치 가로로 스크롤이 움직이는것 같은 효과 구형
		//Pics영역을 스크롤이 벗어나면 다시 absolute에속성으로 변경해서 다시 위쪽으로 움직이도록 배치
		<section className='myScroll pics' ref={frame}>
			<article ref={box}>
				<div>
					<h2>Hello</h2>
				</div>
				<div>
					<h2>Hello</h2>
				</div>
			</article>
		</section>
	);
}

export default Pics;
