import { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { HomePage } from '../../../pages/home';
import { LegendsPage } from '../../../pages/legends';
import { CulturePage } from '../../../pages/culture';
import { NotFoundPage } from '../../../pages/not-found';

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/legends" element={<LegendsPage />} />
        <Route path="/culture" element={<CulturePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
