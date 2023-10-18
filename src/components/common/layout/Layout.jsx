/**
	1. Layout.js를 왜 만들었는지 설명
 */

import './Layout.scss';

export default function Layout({ title, children }) {
	return (
		<section className={`layout ${title}`}>
			<figure></figure>

			<div className='content'>
				<h1>{title}</h1>
				{children}
			</div>
		</section>
	);
}

/**
	1. Layout.js를 왜 만들었는지 설명
	A:
	- 보통 react로 개발하는 프로젝트가 대단위 페이지이기 때문에 공통적인 틀 안에서 특정 변화점이 생겼을때 유지보수하기 편하게 하기 위해 
	- 원래 서브 페이지를 따로 만들어서 작업을 하고 있었는데 서브페이지의 구조를 변경할 일이 생겼는데 너무 반복작업이 많아져서 구글링를 통해 실무작업에선 반복적인 페이지 패턴을 따로 컴포넌트로 만들어서 달라지는 부분만 프롭스로 전달해서 호출하는 식으로 구현해봤음 (good~)
	- 자심감있되 겸손
 */
