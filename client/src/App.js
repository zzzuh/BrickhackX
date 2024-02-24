import './App.css';
import { Button, FileInput } from 'flowbite-react';
import CameraIcon from './components/CameraIcon';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';

function App() {

  const print = (e) => {
    const filename = document.getElementById("file")
  }

  return (
    <div className=' flex items-center justify-center h-screen flex-col'>
      {/* <Button className='gap-6'>
        <CameraIcon></CameraIcon>
        <p className='ml-2'>Upload</p>
      </Button> */}
      <ImageUpload></ImageUpload>
      <ImageDisplay></ImageDisplay>
      
      
    </div>
  );
}

export default App;
