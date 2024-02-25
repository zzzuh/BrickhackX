import './App.css';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';
import NavigatorBar from './components/NavigatorBar';
import { createContext, useState } from 'react';
import StateComponent from './components/State';

export const ImageContext = createContext()

function App() {
  const [image, setImage] = useState()
  return (
    <div className='flex h-screen flex-col'>
      
      <div className='flex items-center justify-center h-screen flex-col'>
      <div className='flex justify-center absolute top-20 w-full'>
        <NavigatorBar></NavigatorBar>
      </div>
        <div className="mt-15 mb-4">
          <StateComponent></StateComponent>
        </div>
        <ImageContext.Provider value={{image, setImage}}>
        <ImageUpload></ImageUpload>
        <ImageDisplay></ImageDisplay>
        </ImageContext.Provider>
      </div>
    </div>
  );
}

export default App;
