/**
	1. 해당 페이지 설명 (이슈사항은 없었는지)
 */

import Layout from '../../common/layout/Layout';
import './Community.scss';
import { useRef, useState, useEffect } from 'react';

export default function Community() {
	const dummyData = useRef([
		{ title: 'title4', content: ' dummy text of the printing and typesetting industry.' },
		{
			title: 'title3',
			content: ' Ipsum is therefore always free from repetition, injected humour.',
		},
		{ title: 'title2', content: ' There are many variations of passages of Lorem Ipsum available.' },
		{ title: 'title1', content: ' The Extremes of Good and Evil) by Cicero, written in 45 BC.' },
	]);

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyData.current;
	};

	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const refEditInput = useRef(null);
	const refEditTextarea = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());
	const [Alloude, setAlloude] = useState(true);

	const resetForm = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};

	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		setPosts([
			{
				title: refInput.current.value,
				content: refTextarea.current.value,
				data: new Date(),
			},
			...Posts,
		]);
		resetForm();
	};

	const deletePost = (delIndex) => {
		if (window.confirm('해당 게시물을 삭제하겠습니까? 게시물 삭제 이후 복구할 수 없습니다.')) {
			setPosts(Posts.filter((_, idx) => delIndex !== idx));
		}
	};

	const enableUpdate = (editindex) => {
		if (!Alloude) return;
		setAlloude(false);
		setPosts(
			Posts.map((post, idx) => {
				if (editindex === idx) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disenableUpdate = (editindex) => {
		setAlloude(true);
		setPosts(
			Posts.map((post, idx) => {
				if (editindex === idx) post.enableUpdate = false;
				return post;
			})
		);
	};

	const updatePost = (updateIndex) => {
		setPosts(
			Posts.map((post, idx) => {
				if (updateIndex === idx) {
					post.title = refEditInput.current.value;
					post.content = refEditTextarea.current.value;
				}
				return post;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='inputBox'>
				<input ref={refInput} type='text' placeholder='제목을 입력하세요.' />
				<br />
				<textarea ref={refTextarea} cols='30' rows='3' placeholder='본문을 입력하세요.'></textarea>

				<nav className='btnSet'>
					<button onClick={resetForm}>cancel</button>
					<button onClick={createPost}>write</button>
				</nav>
			</div>

			<div className='tit'>Posts</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					const string = JSON.stringify(post.data);

					const [year, month, date] = string.split('T')[0].split('"')[1].split('-');

					let [hour, min, sec] = string.split('T')[1].split('.')[0].split(':');
					hour = parseInt(hour) + 9;
					hour >= 24 && (hour = hour - 24);

					if (post.enableUpdate) {
						return (
							<article key={idx}>
								<div className='txt'>
									<input type='text' defaultValue={post.title} ref={refEditInput} />
									<br />
									<textarea defaultValue={post.content} ref={refEditTextarea} />

									<nav>
										<button onClick={() => disenableUpdate(idx)}>Cancel</button>
										<button
											onClick={() => {
												updatePost(idx);
												disenableUpdate(idx);
											}}
										>
											Update
										</button>
									</nav>
								</div>
							</article>
						);
					} else {
						return (
							<article key={idx}>
								<div className='txt'>
									<h2>{post.title}</h2>
									<p>{post.content}</p>

									<nav className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</div>
							</article>
						);
					}
				})}
			</div>
		</Layout>
	);
}

/**
	1. 해당 페이지 설명 (이슈사항은 없었는지)
	A:
	- 아직 데이터베이스를 배우지 않았지만 CRUD가능을 구형하고 싶어서 로컬 저장소를 활용해 만들어 봤음
	- 이슈사항1 : 시간값을 가져왔는데 로컬 저장소에 글이 저장된 시점의 시간을 표준시로 저장을 해서 현재 시간보다 9시간이 늦은 시간으로 출력되는 문제
	- 시간값을 변경하려고 보니 json.pasrse로 객체형태로 시간을 불러와져서 split메서드를 쓸수가 없는 이유를 몰라 삽질
	- 객체형태로 젼환된 값을 다시 stringify로 문자화시킨 다음 split으로 문자값을 가공하고 다시 화면에 출력
	-이슈사항2 : 서브컴퓨터로 작업물을 확인해보니 해당 브라우저에는 저장된 데이터가 없어서 커뮤니티 페이지가 빈화면으로 출력되는 이슈
	- 로컬저장소에 값이 없을때 더미데이터가 출력되도록 수정

	CRUD : 게시판
 */
