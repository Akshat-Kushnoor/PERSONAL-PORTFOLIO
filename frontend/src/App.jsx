import React, { useState } from 'react';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Home from './sections/Home.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';

import Navbar from './components/Navbar.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Footer from './components/Footer.jsx';

import IntroAnimation from './components/IntroAnimation.jsx'; 

function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative gradient text-black">
      
      {!introDone && (
        <IntroAnimation onFinish={() => setIntroDone(true)} />
      )}

      <div
        className={`transition-opacity duration-1000 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <CustomCursor />
        <Navbar />
        <Home />
        <About />
        <Contact />
        <Footer />
      </div>

    </div>
  );
}

export default App;
