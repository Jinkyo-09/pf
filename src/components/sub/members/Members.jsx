import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
	return (
		<Layout title={'Members'}>
			<form>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* userID */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>userID</label>
								</th>
								<td>
									<input type='text' id='userid' name='userid' />
								</td>
							</tr>

							{/* password1 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pw1'>password</label>
								</th>
								<td>
									<input type='text' id='pw1' name='pw1' />
								</td>
							</tr>

							{/* password2 */}
							<tr>
								<th scope='row'>
									<label htmlFor='pw2'>Password</label>
								</th>
								<td>
									<input type='text' id='pw2' name='pw2' />
								</td>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
