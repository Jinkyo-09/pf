import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import SwiperCore, { Autoplay } from 'swiper';
import { useYoutubeQuary } from '../../../hooks/useYoutube';

function Visual() {
	const [Index, setIndex] = useState(0);
	const { data, isSuccess } = useYoutubeQuary();

	/**
		data : react-quary가 반환데이터
		isError : 데이터 응답 실패시 true
		isSuccess : 데이터 응답 성공시 true
		isLoading : 데이터 요청 pending상태일때 true
		isRefeching :true : 동일한 데이터라도 다시 리패칭 처리 유무 (디폴트 false)
	 */

	SwiperCore.use([Autoplay]);

	return (
		<section className='visual myScroll'>
			<div className='titBox'>
				<ul>
					{isSuccess &&
						data.map((tit, idx) => {
							if (idx >= 5) return null;
							return (
								<li key={idx} className={idx === Index ? 'on' : ''}>
									<h3>{tit.snippet.title}</h3>
									<p>{tit.snippet.description.substr(0, 250) + '...'}</p>
									<button>
										<Link to={`/detail/${tit.id}`}>View Deatil</Link>
									</button>
								</li>
							);
						})}
				</ul>
			</div>

			<Swiper
				slidesPerView={1}
				spaceBetween={0}
				loop={true}
				centeredSlides={true}
				onSlideChange={(el) => setIndex(el.realIndex)}
				breakpoints={{
					//1000px보다 브라우저폭이 커졌을때
					1000: {
						slidesPerView: 2,
						spaceBetween: 50,
					},
					1400: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
			>
				{isSuccess &&
					data.map((vid, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={idx}>
								<div className='pic'>
									<img src={vid.snippet.thumbnails.standard.url} alt={vid.title} />
									<img src={vid.snippet.thumbnails.standard.url} alt={vid.title} />
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</section>
	);
}

export default Visual;
