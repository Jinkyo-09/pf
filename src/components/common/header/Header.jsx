import { Link, NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Header.scss';
import { useGlobalData } from '../../../hooks/useGlobalContext';

export default function Header({ isMain }) {
	const { MenuOpen, setMenuOpen } = useGlobalData();

	return (
		<header className='header  myScroll'>
			<h1>
				<Link to='/'>DCODELAB</Link>
			</h1>

			<ul>
				<li>
					<NavLink to='/department' activeClassName='active'>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName='active'>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName='active'>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName='active'>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName='active'>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName='active'>
						Contact
					</NavLink>
				</li>
			</ul>

			<FaBars className='bars' fontSize={22} color={'#888'} onClick={() => setMenuOpen(!MenuOpen)} />
		</header>
	);
}
