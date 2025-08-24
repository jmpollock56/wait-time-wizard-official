import { Link } from 'react-router-dom';

export default function Header() {


  return (
    <header>
      <nav>
        <Link to={'/'} className="site-branding">Wait Time Wizard</Link>
        <div className="park-options">
          Info
        </div>
      </nav>
    </header>
  );
}
