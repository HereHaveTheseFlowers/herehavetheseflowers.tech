import { Router } from './router';
//import { ReactP5Wrapper } from '@p5-wrapper/react';
//import sketch from './components/Sketch';

export default function App() {
  //const isMobile: boolean = window.matchMedia('(max-device-width: 480px)').matches;
  //{!isMobile && <ReactP5Wrapper sketch={sketch} className='p5wrapper' />}
  return (
    <main className='app'>
      <Router />
    </main>
  );
}
