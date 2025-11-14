import { useState } from 'react';
import { RiMenuFill } from 'react-icons/ri';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 
        transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center space-x-2">
          <div className="block lg:absolute left-1/2 transform -translate-x-1/2">
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
    </div>
  );
};

export default Navbar;
