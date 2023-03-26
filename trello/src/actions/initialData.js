export const InitialData = {
  boards: [
    {
      id: "board-1",
      columnOrder: ["column-1", "column-2", "column-3"],
      columns: [
        {
          id: "column-1",
          //   cardId: "column-1",
          boardId: "board-1",
          title: "todo column",
          cardOrder: [
            "card-1",
            "card-2",
            "card-3",
            "card-4",
            "card-5",
            "card-6",
          ],
          cards: [
            {
              id: "card-1",
              columnId: "column-1",
              title: "Title of card 1",
              cover:
                "https://images.pexels.com/photos/12951621/pexels-photo-12951621.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load",
            },
            {
              id: "card-2",
              columnId: "column-1",
              title: "Title of card 2",
              cover: null,
            },
            {
              id: "card-3",
              columnId: "column-1",
              title: "Title of card 3",
              cover: null,
            },
            {
              id: "card-4",
              columnId: "column-1",
              title: "Title of card 4",
              cover: null,
            },
            {
              id: "card-5",
              columnId: "column-1",
              title: "Title of card 5",
              cover: null,
            },
            {
              id: "card-6",
              columnId: "column-1",
              title: "Title of card 6",
              cover: null,
            },
          ],
        },
        {
          id: "column-2",
          boardId: "board-1",
          title: "Doing column",
          cardOrder: ["card-66", "card-7", "card-8"],
          cards: [
            {
              id: "card-66",
              columnId: "column-2",
              title: "Title of card 66",
              cover: null,
            },
            {
              id: "card-7",
              columnId: "column-2",
              title: "Title of card 7",
              cover: null,
            },
            {
              id: "card-8",
              columnId: "column-2",
              title: "Title of card 8",
              cover: null,
            },
          ],
        },
        {
          id: "column-3",
          boardId: "board-1",
          title: "Done column",
          cardOrder: ["card-9", "card-10", "card-11", "card-12"],
          cards: [
            {
              id: "card-9",
              columnId: "column-3",
              title: "Title of card 9",
              cover: null,
            },
            {
              id: "card-10",
              columnId: "column-3",
              title: "Title of card 10",
              cover: null,
            },
            {
              id: "card-11",
              columnId: "column-3",
              title: "Title of card 11",
              cover: null,
            },
            {
              id: "card-12",
              columnId: "column-3",
              title: "Title of card 12",
              cover: null,
            },
          ],
        },
      ],
    },
  ],
};
