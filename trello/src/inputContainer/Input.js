import React from 'react'
import './input.css'
import Task from '../board-task/task'
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';


function InputCard() {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput(true);
  };
  return (
    <div className='input-card'>
        <div  className='input-card-container'>
        {/* {showInput && <input type="text" />} */}
        {showInput && <Task/>}
        </div>
            
        <div className=' confirm'>
            <button className='button-confirm' onClick={handleClick}> Add card
            </button>
            {
              showInput && <button className='button-cancle' >  <ClearIcon/> </button>
            }
            
        </div>



      
    </div>
  )
}

export default InputCard
//     "@fortawesome/fontawesome-svg-core": "^6.3.0",
// "@fortawesome/free-solid-svg-icons": "^6.3.0",
// "@fortawesome/react-fontawesome": "^0.2.0",