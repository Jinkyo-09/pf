import './News.scss';
import { useState, useEffect } from 'react';

function News() {
	const dummyData = [
		{ title: 'title4', content: ' dummy text of the printing and typesetting industry.' },
		{
			title: 'title3',
			content: ' Ipsum is therefore always free from repetition, injected humour.',
		},
		{ title: 'title2', content: ' There are many variations of passages of Lorem Ipsum available.' },
		{ title: 'title1', content: ' The Extremes of Good and Evil) by Cicero, written in 45 BC.' },
	];

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyData;
	};

	const [Post, setPost] = useState(getLocalData());

	useEffect(() => {
		console.log(getLocalData());
		setPost(getLocalData());
	}, []);

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
