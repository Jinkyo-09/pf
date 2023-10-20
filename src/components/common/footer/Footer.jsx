import './Footer.scss';
import { FaTwitter, FaInstagramSquare, FaFacebookSquare } from 'react-icons/fa';

export default function Footer() {
	const twtUrl = 'https://twitter.com/';
	const isgUrl = 'https://www.instagram.com/';
	const fbkUrl = 'https://www.facebook.com/';

	return (
		<footer className='footer'>
			<h1>DCODELAB</h1>
			<ul>
				<li>
					<FaTwitter
						className='twitter'
						fontSize={25}
						color={'#ddd'}
						onClick={() => {
							window.open(twtUrl);
						}}
					/>

					<FaInstagramSquare
						className='instagram'
						fontSize={25}
						color={'#ddd'}
						onClick={() => {
							window.open(isgUrl);
						}}
					/>

					<FaFacebookSquare
						className='facebook'
						fontSize={25}
						color={'#ddd'}
						onClick={() => {
							window.open(fbkUrl);
						}}
					/>
				</li>
			</ul>
		</footer>
	);
}
