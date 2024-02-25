import './App.css';
import ImageUpload from './components/ImageUpload';
import NavigatorBar from './components/NavigatorBar';
import { createContext, useState } from 'react';
import Information from './components/Information';
import StateComponent from './components/State';

export const ImageContext = createContext()

function App() {
  const [image, setImage] = useState()
  const [showInfo, setShowInfo] = useState(false)
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  console.log(response)

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-center flex-col'>
        <div className='flex justify-center top-20 w-full py-20'>
          <NavigatorBar></NavigatorBar>
        </div>
        <div className="mt-15 mb-4">
          <StateComponent></StateComponent>
        </div>
          <ImageContext.Provider value={{image, setImage, showInfo, setShowInfo, response, setResponse, isLoading, setIsLoading}}>
            {showInfo ? <Information/> : <ImageUpload/>} 
          </ImageContext.Provider>
      </div>
    </div>
  );
}

export default App;
