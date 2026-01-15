import Navigation from './components/Navigation.jsx';
import Hero from './components/sections/Hero.jsx';
import Problem from './components/sections/Problem.jsx';
import Technology from './components/sections/Technology.jsx';
import Applications from './components/sections/Applications.jsx';
import Advantage from './components/sections/Advantage.jsx';
import Vision from './components/sections/Vision.jsx';
import Contact from './components/sections/Contact.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <Technology />
        <Applications />
        <Advantage />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
