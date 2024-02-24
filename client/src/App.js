import './App.css';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []); // The empty array ensures this effect runs only once after the initial render


  return (
    <>GG</>
  );
}

export default App;
