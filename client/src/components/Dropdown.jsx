import { useContext } from "react";
import { ImageContext } from "../App";

const Dropdown = ({ options }) => {
  const {setLocation} = useContext(ImageContext)

  const handleChange = (e) => {
    e.preventDefault()
    setLocation(e.target.value)
  }
    return (
      <select 
        style={{ 
          width: '200px', 
          height: '40px', 
          borderRadius: '5px' // Adding rounded corners
        }}
        onChange={handleChange}
      >
        <option value="">Select a location</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.displayValue}
            </option>
          );
        })}
      </select>
    );
  };
  
  export default Dropdown;
  