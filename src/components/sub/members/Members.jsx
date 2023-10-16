import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState } from 'react';

export default function Members() {
	const initVal = {
		userid: '',
		pw1: '',
		pw2: '',
		emaim: '',
	};

	const [Val, setVal] = useState(initVal);

	const HandleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	//인수값으로 state를 전달받아서 각 데이터별로 인증처리후
	//만약 인증 에러가 발생하면 해당 name값으로 에서 물구를 생성해서 반환하는 함수
	const check = (value) => {
		const num = /[0-9]/; //0과 9까지의 모든 값을 정규표현식으로 범위 지정
		const txt = /[a-zA-Z]/; //대소문자 구분 없이 모든 문자 범위 지정
		const spc = /[~!@#$%^&*()-_?]/; //모든 특수문자 지정

		const errs = {};
		if (value.userid.length < 5) {
			errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		}
		//비밀번호 인증 (5글자 이상, 문자, 숫자, 특수문자 모두 포함)
		if (value.pw1.length < 5 || !num.test(value.pw1) || !txt.test(value.pw1) || !spc.test(value.pw1)) {
			errs.pw1 = '비밀번호는 5글자 이상, 문자, 숫자, 특수문자를 모두 포함해야합니다.';
		}

		//비밀번호 재확인 인증
		if (value.pw1 !== value.pw2) {
			errs.pw2 = '비밀번호가 일치하지 않습니다.';
		}
		return errs;
	};

	//전송이벤트 발생시 state에 있는 input값들을 check함수에 전달해서 호출
	//만약 check함수가 에러 객체를 하나도 전달하지 않으면 인증 성공
	//하나라도 에러객체가 전달되면 인증실패 처리하면서 name값과 매칭되는 input요소 아래쪽에 에러메세지 출력
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(check(Val));
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
									<input
										type='text'
										id='userid'
										name='userid'
										//onChange가 발생할때마다 실시간으로 변경되고 있는 state의 value값을 출력
										value={Val.userid}
										onChange={HandleChange}
									/>
								</td>
							</tr>

							{/* password1 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pw1'>Password</label>
								</th>
								<td>
									<input type='password' id='pw1' name='pw1' value={Val.pw1} onChange={HandleChange} />
								</td>
							</tr>

							{/* password2 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pw2'>Re-Password</label>
								</th>
								<td>
									<input type='password' id='pw2' name='pw2' value={Val.pw2} onChange={HandleChange} />
								</td>
							</tr>

							{/* password2 */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-mail</label>
								</th>
								<td>
									<input type='text' id='email' name='email' value={Val.email} onChange={HandleChange} />
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' Value='cancel' />
									<input type='submit' Value='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
