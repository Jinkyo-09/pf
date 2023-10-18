/**
	1. 해당 컴포넌트에 대해 설명, 이슈사항
 */

import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Gallery.scss';
import { useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlickr } from '../../../redux/flickrSlice';
import { open } from '../../../redux/modalSlicke';

export default function Gallery() {
	const dispatch = useDispatch();
	const Pics = useSelector((store) => store.flickr.data);
	const refInput = useRef(null);
	const refBtnSet = useRef(null);
	const [ActiveURL, setActiveURL] = useState('');
	const [IsUser, setIsUser] = useState(true);
	const my_id = '164021883@N04';

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsUser(false);

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));

		if (refInput.current.value.trim() === '') {
			return alert('검색어를 입력하세요.');
		}

		dispatch(fetchFlickr({ type: 'search', tags: refInput.current.value }));
		refInput.current.value = '';
	};

	const handleClickMy = (e) => {
		setIsUser(true);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'user', id: my_id }));
	};

	const handleClickInterest = (e) => {
		setIsUser(false);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'interest' }));
	};

	const handleClickProfile = (e) => {
		if (IsUser) return;
		dispatch(fetchFlickr({ type: 'user', id: e.target.innerText }));
		setIsUser(true);
	};

	return (
		<>
			<Layout title={'Gallery'}>
				<div className='searchBox'>
					<form onSubmit={handleSubmit}>
						<input ref={refInput} type='text' placeholder='검색어를 입력하세요' />
						<button>검색</button>
					</form>
				</div>

				<div className='btnSet' ref={refBtnSet}>
					<button className='on' onClick={handleClickMy}>
						My Gallery
					</button>

					<button onClick={handleClickInterest}>Interest Gallery</button>
				</div>

				<div className='picFrame'>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }} disableImagesLoaded={false} updateOnEachImageLoad={false}>
						{Pics.map((data, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<img
											className='pic'
											src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
											alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
											onClick={(e) => {
												setActiveURL(e.target.getAttribute('alt'));
												dispatch(open());
											}}
										/>
										<h2>{data.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
												alt={data.owner}
												onError={(e) => {
													e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
												}}
											/>
											<span onClick={handleClickProfile}>{data.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Modal>
				<img src={ActiveURL} alt='img' />
			</Modal>
		</>
	);
}

/**
	1. 해당 컴포넌트에 대해 설명, 이슈사항
	A: 
	- 유튜브 컴포넌트 작업을 하면서 비동기 데이터를 redux-toolkit을 이용해서 전역데이터 관리하는게 익숙해져서 flickr도 시도해봄
	- 이슈사향1 : flickr데이터를 가져온 다음에 버튼을 클릭하거나 검색어 입력 등의 이벤트가 발생할 때마다 실시간으로 전역 store데이터 변경 요청을 해야하는 것에 어려움이 있었다
	- 어려웠던 이유가 유튜브와 구글링을 해도 해당 내용이 없어서 혼자 해결해야하는 부분이 어려웠음
	- 이벤트가 발생할 때마다 생성된 액션 객체를 계속해서 dispatch로 reducer에 데이터 변경 요청을 하도록 처리한다

	- 이슈사항2 : 내 아이디 갤러리나 사용자 아이디를 클리해서 출력하는 user타입의 갤러리 랜더링 시에는 사용자 아이디를 클릭할때마다 중복데이터 호출이 일어남
	- 해당 문제점을 해결하기 위해서 user타입의 갤러리가 렌더링 될때에만 state값을 변경하고 사용자 아이디의 클릭 이벤트를 막음으로서 불필요한 서버데이터 호출을 방지
 */
