import { useFlickrQuary } from '../../../hooks/useFlickr';
import './Info.scss';

function Info() {
	const { data, isSuccess } = useFlickrQuary({ type: 'user', id: '199299808@N06' });

	return (
		<section className='info myScroll'>
			<div className='wrap'>
				{isSuccess &&
					data.map((pic, idx) => {
						if (idx >= 6) return null;
						return (
							<article key={idx}>
								<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} alt={pic.title} />
							</article>
						);
					})}
			</div>
		</section>
	);
}

export default Info;
