import Layout from '../../common/layout/Layout';
import './Community.scss';
import { useRef, useState, useEffect } from 'react';

export default function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
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
