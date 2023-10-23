import './News.scss';
import { useState, useEffect, useCallback, useMemo } from 'react';

function News() {
	//useMemo는 특정 함수가 리턴해주는 값만 메모이제이션 가능하므로 dummyData에 담길 값 자체를 함수가 리천하게 처리하고 해당 함수를 useMemo의 인수로 전달한다음 의존성 배열을 비워놓음
	//실제로는
	const dummyData = useMemo(() => {
		return [
			{ title: 'title4', content: ' dummy text of the printing and typesetting industry.' },
			{
				title: 'title3',
				content: ' Ipsum is therefore always free from repetition, injected humour.',
			},
			{ title: 'title2', content: ' There are many variations of passages of Lorem Ipsum available.' },
			{ title: 'title1', content: ' The Extremes of Good and Evil) by Cicero, written in 45 BC.' },
		];
	}, []);

	const getLocalData = useCallback(() => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyData;
	}, [dummyData]);

	const [Post, setPost] = useState(getLocalData());

	useEffect(() => {
		console.log(getLocalData());
		setPost(getLocalData());
	}, [getLocalData]);

	return (
		<section className='news myScroll'>
			<h2>news</h2>
			<div className='postWrap'>
				{Post &&
					Post.map((el, idx) => {
						if (idx >= 4) return null;
						else
							return (
								<article key={idx}>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
								</article>
							);
					})}
			</div>
		</section>
	);
}

export default News;
