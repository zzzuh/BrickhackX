import './App.css';
import React, { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []); 

  return (
    <>
      GG
    </>
  );
}

export default App;
