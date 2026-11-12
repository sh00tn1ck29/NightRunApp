import { Link, NavLink } from 'react-router';
import './Header.scss';

const navigation = [
  { to: '/', label: 'Home', number: '01' },
  { to: '/legends', label: 'Legends', number: '02' },
  { to: '/culture', label: 'Culture', number: '03' },
];

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link className="header__brand" to="/" aria-label="Touge Spirit — главная">
          <span className="header__mark" aria-hidden="true">TS</span>
          <span className="header__wordmark" aria-hidden="true">
            TOUGE<br />SPIRIT
          </span>
        </Link>

        <nav className="header__nav" aria-label="Основная навигация">
          <ul className="header__list">
            {navigation.map(({ to, label, number }) => (
              <li className="header__item" key={to}>
                <NavLink
                  className="header__link"
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

        <div className="header__location">
          <span className="header__region"><span lang="ja">群馬県</span> / JP</span>
          <span className="header__coordinates">36.5608° N</span>
        </div>
      </div>
    </header>
  );
}
