const Dropdown = ({ options }) => {
    return (
      <select 
        style={{ 
          width: '200px', 
          height: '40px', 
          borderRadius: '5px' // Adding rounded corners
        }}
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
  