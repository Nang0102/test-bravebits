import React from 'react'
import './column.scss'
import ClearIcon from '@mui/icons-material/Clear';


function Popper(props) {
  return (
    <div className='popper'>
      <span className='popper-actions'>Actions</span>
            <ClearIcon  className='popper-clear'/>

      <button>Edit Column</button>
      <button>Delete Column</button>
    </div>
  )
}

export default Popper
