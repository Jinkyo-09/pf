/**
	1. 해당 페이지를 어떤 방식으로 작업했고 어떤 이슈가 있었는지
 */

import Layout from '../../common/layout/Layout';
import { useEffect, useState, useRef } from 'react';
import './Department.scss';
const path = process.env.PUBLIC_URL;

export default function Department() {
	const refSliderWrap = useRef(null);
	const [Department, setDepartment] = useState([]);

	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.catch((err) => console.log(err))
			.then((json) => {
				setDepartment(json.members);
			})
			.catch((err) => console.log(err));
	}, []);

	const next = () => {
		const wrap = refSliderWrap.current;
		wrap.append(wrap.firstElementChild);
	};
	const prev = () => {
		const wrap = refSliderWrap.current;
		wrap.prepend(wrap.lastElementChild);
	};

	return (
		<Layout title={'Department'}>
			{/* 
			<div className='sliderBox'>
				<button className='prev' onClick={prev}>
					prev
				</button>
				<button className='next' onClick={next}>
					next
				</button>

				<section className='sliderWrap' ref={refSliderWrap}>
					<article>1</article>
					<article>2</article>
					<article>3</article>
					<article>4</article>
					<article>5</article>
				</section>
			</div>
			*/}

			<div className='container'>
				<div className='infoBox'>
					<p>Our Team</p>
				</div>

				<div className='lower'>
					<p className='exp'>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio aliquam soluta expedita fuga similique vitae quisquam. Distinctio,
						natus atque? Dolores commodi doloremque quibusdam nisi obcaecati qui ad.
					</p>
					<div className='memberBox'>
						{Department.map((member, idx) => {
							return (
								<article key={idx}>
									<div className='pic'>
										<img src={`${path}/img/${member.pic}`} alt={member.name} />
									</div>
									<h2>{member.name}</h2>
									<p>{member.position}</p>
								</article>
							);
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
}

/**
	1. 해당 페이지를 어떤 방식으로 작업했고 어떤 이슈가 있었는지
	A: 
	- 정적인 데이터라서 굳이 fetch를 통해서 데이터를 가져오지 않고 static하게 컨텐츠를 집어넣을까 고민도 했지만 데이터 기반으로 모든 화면단이 동적으로 생성되게 하고 싶어서 fetch를 통해서 데이터가 변경되더라도 자동으로 화면서 갱신되도록 작업을 했다

	static : 정적인
 */
