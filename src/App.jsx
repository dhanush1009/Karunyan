import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import Work from './components/Work/Work';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import VideoModal from './components/Modal/VideoModal';
import Toast from './components/UI/Toast';

export default function App() {
  return (
    <PortfolioProvider>
      <Navbar />
      <main id="top">
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <VideoModal />
      <Toast />
    </PortfolioProvider>
  );
}
