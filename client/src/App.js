import './App.css';
import ImageUpload from './components/ImageUpload';
import NavigatorBar from './components/NavigatorBar';
import { createContext, useState } from 'react';
import Information from './components/Information';

export const ImageContext = createContext()

function App() {
  const [image, setImage] = useState()
  const [showInfo, setShowInfo] = useState(false)
  const [response, setResponse] = useState(null)

  console.log(response)
  return (
    <div className=' flex h-screen flex-col'>
      <NavigatorBar></NavigatorBar>
      <div className='flex items-center justify-center h-screen flex-col'>
        <ImageContext.Provider value={{image, setImage, showInfo, setShowInfo, formData, setFormData, response, setResponse}}>
          {showInfo ? <Information itemName={"lol"} itemRecycle={"lol"}/> : <ImageUpload/>} 
        </ImageContext.Provider>
      </div>
    </div>
  );
}

export default App;
