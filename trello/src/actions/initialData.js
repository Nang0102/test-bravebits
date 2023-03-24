
export const InitialData = {
    boards:[
        {
            id: 'board-1',
            columnOrder:[ 'column-1', 'column-2', 'column-3'],
            columns:[
                {
                    id: 'column-1',
                    boardId:  'board-1',
                    title: 'todo column',
                    cardOrder: [ 'card-1', 'card-2', 'card-3','card-4','card-5','card-6'],
                    cards:[
                        { id: 'card-1', columnId:  'card-1',title: 'Title of card 1',cover:'https://images.pexels.com/photos/12951621/pexels-photo-12951621.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load' },
                        { id: 'card-2', columnId:  'card-1',title: 'Title of card 2',cover:null },
                        { id: 'card-3', columnId:  'card-1',title: 'Title of card 3',cover:null },
                        { id: 'card-4', columnId:  'card-1',title: 'Title of card 4',cover:null },
                        { id: 'card-5', columnId:  'card-1',title: 'Title of card 5',cover:null },
                        { id: 'card-6', columnId:  'card-1',title: 'Title of card 6',cover:null },
                    ]
                },
                {
                    id: 'column-2',
                    boardId:  'board-1',
                    title: 'Doing column',
                    cardOrder: [ 'card-1', 'card-2', 'card-3'],
                    cards:[
                        { id: 'card-1', columnId:  'card-1',title: 'Title of card 1',cover:null },
                        { id: 'card-2', columnId:  'card-1',title: 'Title of card 2',cover:null },
                        { id: 'card-3', columnId:  'card-1',title: 'Title of card 3',cover:null }
                   
                    ]
                },
                {
                    id: 'column-3',
                    boardId:  'board-1',
                    title: 'Done column',
                    cardOrder: [ 'card-1', 'card-2', 'card-3','card-4'],
                    cards:[
                        { id: 'card-1', columnId:  'card-1',title: 'Title of card 1',cover:null },
                        { id: 'card-2', columnId:  'card-1',title: 'Title of card 2',cover:null },
                        { id: 'card-3', columnId:  'card-1',title: 'Title of card 3',cover:null },
                        { id: 'card-4', columnId:  'card-1',title: 'Title of card 4',cover:null }
                    ]
                }
            ]
        }
    ]
}
