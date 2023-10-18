import './News.scss';
import { useState } from 'react';

function News() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};

	const [Post] = useState(getLocalData());

	return (
		<section className='news'>
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
