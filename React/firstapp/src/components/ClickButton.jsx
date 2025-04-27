import { useState } from "react";
const ClickButton = () => {

    const [message, setMessage] = useState('')
    
    return (
    <>
    <button onClick={() => setMessage('You have Clicked')} 
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click Me 
    </button>
    <p>{message}</p>
    </>
  )
}

export default ClickButton