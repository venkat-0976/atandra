import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that scrolls to the top of the page when navigation occurs
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined') return;

    // Only scroll to top if the pathname has actually changed
    if (prevPathRef.current !== pathname) {
      window.scrollTo(0, 0);
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;