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
