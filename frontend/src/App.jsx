import React from 'react';
import About from './sections/About.jsx';
import Contact from './sections/Contact.jsx';
import Home from './sections/Home.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';

import Navbar from './components/Navbar.jsx';
import ParticlesBG from './components/ParticlesBG.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Footer from './components/Footer.jsx';   
import OverlayMenu from './components/OverlayMenu.jsx';

function App() {
  return (
     <div className="relative gradient text-black">

      <ParticlesBG/>
      <CustomCursor/>
      <Navbar />
      <Home/>
      <About/>
      <Skills/>
      <Projects/>
      <Contact/>
      <Footer/>

    </div>
  );
}

export default App;
