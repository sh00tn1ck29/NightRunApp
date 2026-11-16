import { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { HomePage } from '../../../pages/home';
import { LegendsPage } from '../../../pages/legends';
import { MachinePage } from '../../../pages/machine';
import { CulturePage } from '../../../pages/culture';
import { NotFoundPage } from '../../../pages/not-found';
import { machines } from '../../../entities/machine';

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const main = document.querySelector('main');
    if (main) {
      main.id = 'main-content';
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    }
    const machine = machines.find(item => pathname === `/legends/${item.id}`);
    const title = machine ? `${machine.brand} ${machine.name} ${machine.archiveModel}`
      : ({ '/': 'JDM legends', '/legends': 'Legends archive', '/culture': 'JDM culture' } as Record<string, string>)[pathname] ?? 'Page not found';
    document.title = `${title} | Touge Spirit`;
  }, [pathname]);

  return null;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/legends" element={<LegendsPage />} />
        <Route path="/legends/:machineId" element={<MachinePage />} />
        <Route path="/culture" element={<CulturePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
