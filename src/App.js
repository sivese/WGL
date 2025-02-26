import { useEffect, useRef } from 'react';
import GLMain from './gl/wgl';
import Square from './tic/square';
import './App.css';

const WebGLCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if(canvasRef.current) {
      GLMain(canvasRef.current);
    }
  }, []);

  return <canvas ref={canvasRef} id="c"/>;
}

function App() {
  return (
    <div>
      <Square />
      <WebGLCanvas />
    </div>
  );
}

export default App;
