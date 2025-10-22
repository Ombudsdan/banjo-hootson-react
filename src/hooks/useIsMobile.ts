import { Breakpoint } from 'model/breakpoint';
import { useEffect, useState } from 'react';

export default function useIsMobile(breakpoint = Breakpoint.M) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}
