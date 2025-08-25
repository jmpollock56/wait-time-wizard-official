import { Link } from 'react-router-dom';

export default function Header() {


  return (
    <header>
      <nav>
        <Link to={'/'} className="site-branding">Wait Time Wizard</Link>
        <Link to={'/about'} className="about-link">About</Link>
      </nav>
    </header>
  );
}
