import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './sections/About';
import Contact from './sections/Contact';
import Home from './sections/Home';
import Projects from './sections/Projects';
import Skills from './sections/Skills';

function App() {
  return (
    <div>
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

export default App
