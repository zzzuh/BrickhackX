const NavigatorBar = () => {
  return (
    <nav className="bg-gray-600 flex items-center justify-between h-12 w-full px-4">
        <div className='flex items-center'>
            <img src="/minil.png" className="h-6" alt="ReFlick Logo" />
        </div>
        <div className='flex items-center'>
            <button className="bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full">
            User</button>
        </div>
    </nav>
  );
};

export default NavigatorBar;
