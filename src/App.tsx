import React from 'react';
import ThreeDScene from './components/ThreeDScene';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  return (
    <div>
      {/* 3D Hero Section with NavBar */}
      <ThreeDScene />
      {/* Main Content Sections */}
      <section id="about">
        <h2>About Me</h2>
        <About />
      </section>
      <section id="skills">
        <h2>Skills</h2>
        <Skills />
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <Projects />
      </section>
      <section id="experience">
        <h2>Experience</h2>
        <Experience />
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <Contact />
      </section>
    </div>
  );
}
export default App;