import { Link, NavLink } from 'react-router';
import './Header.scss';

const navigation = [
  { to: '/', label: 'Home', number: '01' },
  { to: '/legends', label: 'Legends', number: '02' },
  { to: '/culture', label: 'Culture', number: '03' },
];

type HeaderProps = {
  variant?: 'default' | 'archive';
};

export function Header({ variant = 'default' }: HeaderProps) {
  return (
    <header className={`header${variant === 'archive' ? ' header--archive' : ''}`}>
      <div className="header__inner">
        <Link className="header__brand" to="/" aria-label="Touge Spirit - home">
          <span className="header__mark" aria-hidden="true">TS</span>
          <span className="header__wordmark" aria-hidden="true">
            TOUGE<br />SPIRIT
          </span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__list">
            {navigation.map(({ to, label, number }) => (
              <li className="header__item" key={to}>
                <NavLink
                  className={({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`}
                  to={to}
                  end={to === '/'}
                >
                  {label}
                  <span className="header__number" aria-hidden="true">{number}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {variant === 'archive' ? (
          <p className="header__status"><span aria-hidden="true" />Archive online</p>
        ) : <div className="header__location">
          <span className="header__region"><span lang="ja">群馬県</span> / JP</span>
          <span className="header__coordinates">36.5608° N</span>
        </div>}
      </div>
    </header>
  );
}
