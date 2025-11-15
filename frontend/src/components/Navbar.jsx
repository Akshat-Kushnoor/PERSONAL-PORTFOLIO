import { useState, useEffect, useRef } from 'react';
import { RiMenuFill } from 'react-icons/ri';
import OverlayMenu from './OverlayMenu.jsx';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const idleTimer = useRef(null);
  const hasScrolled = useRef(false); // prevents hiding on home screen initially

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Mark that user has started scrolling once
      if (!hasScrolled.current && currentScrollY > 5) {
        hasScrolled.current = true;
      }

      // If scrolling down -> hide navbar (only after first scroll)
      if (hasScrolled.current && currentScrollY > lastScrollY.current) {
        setVisible(false);
      }

      // Scrolling up -> show navbar (always allowed)
      if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

      // Reset idle timer
      if (idleTimer.current) clearTimeout(idleTimer.current);

      // Only hide after 3 sec of still *after user has scrolled at least once*
      if (hasScrolled.current) {
        idleTimer.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between p-4 mt-3 z-50 
        transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex items-center space-x-2 w-full">

          {/* Reach Out Button */}
          <div className="fixed top-0 right-0 lg:block">
            <a className="bg-gradient-to-r from-pink-300 to-blue-400 text-white text-lg p-2 rounded-full">
              Reach Out
            </a>
          </div>

          {/* Menu Button */}
          <div className="block lg:absolute left-0 ml-5 transform -translate-x-1/2">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white text-2xl focus:outline-none"
              aria-label="OPEN-MENU"
            >
              <RiMenuFill />
            </button>
          </div>

        </div>
      </nav>

      <OverlayMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />
    </div>
  );
};

export default Navbar;
