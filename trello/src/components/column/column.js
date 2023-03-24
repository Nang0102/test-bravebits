import Card from 'components/cards/card'
import React from 'react'
import './column.scss'
import { mapOrder} from 'utilities/sorts'
// import {handleDragStart, handleDragEnter, handleDragOver, handleDragEnd, handleDrop} from 'components/drag&drop/drag&drop'


function Column(props) {
  // const {column} = props
  
  const { column, setColumns } = props;
  // const cards= column.cards
  const cards= mapOrder(column.cards, column.cardOrder,'id')
  return (
    <div>
      <div className="columns">
        <header> {column.title}</header>
        <ul className='card-list'>
          {cards.map((card,index)=> <Card key={index} card={card} />)}
        </ul>
        <footer> Add another card</footer>
      </div>  
    </div>
  )
}

export default Column
