import React from 'react'
import './card.scss'
// import {handleDragStart, handleDragEnter, handleDragOver, handleDragEnd, handleDrop} from 'components/drag&drop/drag&drop'

function Card(props) {
  const {card }= props
  // const { card, setColumns } = props;
  // const { id, title, description } = card;
  return (
    
                <li className='card-item'>
            {/* <img
              src="https://images.pexels.com/photos/12951621/pexels-photo-12951621.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
              alt=""
            /> */}
            {card.cover && <img src={card.cover} className='card-cover' alt=''/>}
          {card.title}
          </li >

  )
}

export default Card
