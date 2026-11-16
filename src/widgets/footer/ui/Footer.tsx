import { Link } from 'react-router';
import './Footer.scss';

type FooterProps = {
  instagramUrl?: string;
  variant?: 'default' | 'compact';
};

export function Footer({ instagramUrl, variant = 'default' }: FooterProps) {
  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  if (variant === 'compact') {
    return (
      <footer className="footer footer--compact">
        <div className="footer__container footer__compact-inner">
          <Link className="footer__compact-brand" to="/" aria-label="Touge Spirit - home">
            <span className="footer__mark" aria-hidden="true">TS</span>
          </Link>
          <p className="footer__compact-title">The road never ends.</p>
          <span className="footer__compact-japanese" lang="ja">終わりなき道</span>
          <Link className="footer__home" to="/">Return home <span aria-hidden="true">↑</span></Link>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <button className="footer__brand" type="button" onClick={scrollToTop} aria-label="Touge Spirit - back to top">
            <span className="footer__mark" aria-hidden="true">TS</span>
            <span className="footer__wordmark" aria-hidden="true">Touge<br />Spirit</span>
          </button>

          <p className="footer__motto">Born in the mountains.<br />Driven by the night.</p>

          <nav className="footer__navigation" aria-label="Footer navigation">
            {instagramUrl ? (
              <a className="footer__link" href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            ) : (
              <span className="footer__link">Instagram</span>
            )}
            <a className="footer__link" href="#legends">Archive</a>
            <a className="footer__link" href="#culture">Journal</a>
          </nav>
        </div>

        <div className="footer__statement">
          <p className="footer__headline">
            <span className="footer__headline-line">The road</span>
            <span className="footer__headline-line footer__headline-line--accent">Never ends.</span>
          </p>
          <span className="footer__japanese" lang="ja">終わりなき道</span>
        </div>

        <div className="footer__bottom">
          <small className="footer__copyright">© 2025 Touge Spirit</small>
          <p className="footer__closing">Keep the culture alive.</p>
          <button className="footer__back" type="button" onClick={scrollToTop}>
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
