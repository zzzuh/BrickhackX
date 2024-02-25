import './App.css';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';
import { createContext, useState } from 'react';
import { Navbar } from 'flowbite-react';

export const ImageContext = createContext()

function App() {
  const [image, setImage] = useState()
  return (
    <div className=' flex h-screen flex-col'>
      <Navbar></Navbar>
      <div className='flex items-center justify-center h-screen flex-col'>
        <ImageContext.Provider value={{image, setImage}}>
          <ImageUpload></ImageUpload>
          <ImageDisplay></ImageDisplay>
        </ImageContext.Provider>
      </div>
    </div>
  );
}

export default App;
