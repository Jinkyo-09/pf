import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState, useRef } from 'react';

export default function Members() {
	const initVal = {
		userid: '',
		pw1: '',
		pw2: '',
		emaim: '',
		gender: false,
		interest: false,
		edu: '',
		comments: '',
	};
	const refCheckGroup = useRef(null);
	const refRadioGroup = useRef(null);
	const refSelGroup = useRef(null);
	const [Val, setVal] = useState(initVal);
	const [Errs, setErrs] = useState([]);

	const HandleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name, checked } = e.target;
		setVal({ ...Val, [name]: checked });
	};

	const resetForm = (e) => {
		e.preventDefault();
		setVal(initVal);

		[refCheckGroup, refRadioGroup].forEach((el) => el.current.querySelectorAll('input').forEach((input) => (input.checked = false)));
		refSelGroup.current.value = '';
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');
		inputs.forEach((input) => input.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	};

	const check = (value) => {
		const num = /[0-9]/;
		const txt = /[a-zA-Z]/;
		const spc = /[~!@#$%^&*()-_?]/;

		const errs = {};
		if (value.userid.length < 5) {
			errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		}
		if (value.pw1.length < 5 || !num.test(value.pw1) || !txt.test(value.pw1) || !spc.test(value.pw1)) {
			errs.pwd1 = '비밀번호는 5글자이상, 문자,숫자,특수문자를 모두 포함해야 합니다.';
		}

		if (value.pw1 !== value.pw2 || !value.pw2) {
			errs.pwd2 = '2개의 비밀번호를 같게 입력하세요.';
		}

		if (!value.email || !/@/.test(value.email)) {
			errs.email = '이메일은 무조건 @를 포함해야 합니다.';
		} else {
			const [forward, backward] = value.email.split('@');
			if (!forward || !backward) {
				errs.email = '이메일에 @앞뒤로 문자값이 있어야 합니다.';
			} else {
				const [forward, backward] = value.email.split('.');
				if (!forward || !backward) {
					errs.email = '이메일 . 앞뒤로 문자값이 있어야 합니다.';
				}
			}
		}

		if (!value.gender) {
			errs.gender = '성별은 필수 체크 항목입니다.';
		}

		if (!value.interest) {
			errs.interest = '관심사를 하나 이상 체크해주세요.';
		}

		if (!value.edu) {
			errs.edu = '학력을 선택하세요.';
		}

		if (value.comments.length < 10) {
			errs.comments = '남기는말은 10글자 이상 입력하세요.';
		}

		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(check(Val)).length === 0) {
			alert('인증통과');
		} else {
			setErrs(check(Val));
		}
	};

	return (
		<Layout title={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* userID */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>UserID</label>
								</th>
								<td>
									<input type='text' id='userid' name='userid' value={Val.userid} onChange={HandleChange} placeholder='아이디를 입력하세요.' />
									{Errs.userid && <p>{Errs.userid}</p>}
								</td>
							</tr>

							{/* password1 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pw1'>Password</label>
								</th>
								<td>
									<input type='password' id='pw1' name='pw1' value={Val.pw1} onChange={HandleChange} placeholder='비밀번호를 입력하세요.' />
									{Errs.pwd1 && <p>{Errs.pwd1}</p>}
								</td>
							</tr>

							{/* password2 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pw2'>Re-Password</label>
								</th>
								<td>
									<input type='password' id='pw2' name='pw2' value={Val.pw2} onChange={HandleChange} placeholder='비밀번호를 재입력하세요.' />
									{Errs.pwd2 && <p>{Errs.pwd2}</p>}
								</td>
							</tr>

							{/* password2 */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-mail</label>
								</th>
								<td>
									<input type='text' id='email' name='email' value={Val.email} onChange={HandleChange} placeholder='이메일 주소를 입력하세요.' />
									{Errs.email && <p>{Errs.email}</p>}
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th>gender</th>
								<td ref={refRadioGroup}>
									<label htmlFor='female'>female</label>
									<input type='radio' name='gender' id='female' onChange={handleRadio} />

									<label htmlFor='male'>male</label>
									<input type='radio' name='gender' id='male' onChange={handleRadio} />
									{Errs.gender && <p>{Errs.gender}</p>}
								</td>
							</tr>

							{/* interest */}
							<tr>
								<th>Interests</th>
								<td ref={refCheckGroup}>
									<label htmlFor='sports'>sports</label>
									<input type='checkbox' id='sports' name='interest' onChange={handleRadio} />

									<label htmlFor='game'>game</label>
									<input type='checkbox' id='game' name='interest' onChange={handleRadio} />

									<label htmlFor='music'>music</label>
									<input type='checkbox' id='music' name='interest' onChange={handleRadio} />

									{Errs.interest && <p>{Errs.interest}</p>}
								</td>
							</tr>

							{/* education */}
							<tr>
								<th>
									<label htmlFor='edu'>Education</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={HandleChange} ref={refSelGroup}>
										<option value=''>최종학력을 선택하세요.</option>
										<option value='elementary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									{Errs.edu && <p>{Errs.edu}</p>}
								</td>
							</tr>

							{/* comments */}
							<tr>
								<th>
									<label htmlFor='comments'>Comments</label>
								</th>
								<td>
									<textarea
										name='comments'
										id=''
										cols='30'
										rows='3'
										value={Val.comments}
										onChange={HandleChange}
										placeholder='남기는 말을 입력하세요.'
									></textarea>
									{Errs.comments && <p>{Errs.comments}</p>}
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' Value='Cancel' onClick={resetForm} />
									<input type='submit' Value='Send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
