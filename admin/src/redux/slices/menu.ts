import { createSlice } from '@reduxjs/toolkit';
import omit from 'lodash/omit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { gql, GraphQLClient } from 'graphql-request';

import {
  UpdateOnePageDocument,
  UpdateOneWebsiteDocument,
  FindUniqueWebsiteDocument,
  FindManyPageDocument,
} from 'generated';

const graphqlRequest = async (query, variables) => {
  const accessToken = localStorage.getItem('accessToken');
  const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await graphQLClient.request(query, variables);
  return result;
};
// ----------------------------------------------------------------------

function objFromArray(array, key = 'id') {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

const initialState = {
  isLoading: false,
  error: null,
  board: {
    cards: {},
    columns: {},
    columnOrder: [],
  },
};

const slice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET BOARD
    getBoardSuccess(state, action) {
      state.isLoading = false;
      const board = action.payload;
      const cards = objFromArray(board.cards);
      const columns = objFromArray(board.columns);
      const { columnOrder } = board;
      state.board = {
        id: board.id,
        slug: board.slug,
        cards,
        columns,
        columnOrder,
      };
    },

    // CREATE NEW COLUMN
    createColumnSuccess(state, action) {
      const newColumn = action.payload;
      state.isLoading = false;
      state.board.columns = {
        ...state.board.columns,
        [newColumn.id]: newColumn,
      };
      state.board.columnOrder.push(newColumn.id);
    },

    persistCard(state, action) {
      const columns = action.payload;
      state.isLoading = false;
      state.board.columns = columns;
    },

    persistColumn(state, action) {
      state.isLoading = false;
      state.board.columnOrder = action.payload;
    },

    addTask(state, action) {
      const { card, columnId } = action.payload;
      state.isLoading = false;

      state.board.cards[card.id] = card;
      state.board.columns[columnId].cardIds.push(card.id);
    },

    setIndexCard(state, action) {
      const cards = action.payload;
      state.isLoading = false;
      state.board.cards = cards
    },

    deleteTask(state, action) {
      const { cardId, columnId } = action.payload;
      state.isLoading = false;

      state.board.columns[columnId].cardIds = state.board.columns[columnId].cardIds.filter((id) => id !== cardId);
      state.board.cards = omit(state.board.cards, [cardId]);
    },

    // UPDATE COLUMN
    updateColumnSuccess(state, action) {
      const column = action.payload;

      state.isLoading = false;
      state.board.columns[column.id] = column;
    },

    // DELETE COLUMN
    deleteColumnSuccess(state, action) {
      const { columnId } = action.payload;
      const deletedColumn = state.board.columns[columnId];

      state.isLoading = false;
      state.board.columns = omit(state.board.columns, [columnId]);
      state.board.cards = omit(state.board.cards, [...deletedColumn.cardIds]);
      state.board.columnOrder = state.board.columnOrder.filter((c) => c !== columnId);
    },
  },
});

// Reducer
export default slice.reducer;

export const { actions } = slice;

// ----------------------------------------------------------------------

export function getBoard(websiteId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const websiteData = await graphqlRequest(FindUniqueWebsiteDocument, {
        where: {
          id: websiteId,
        },
      });
      let cards = []
      if (websiteData?.findUniqueWebsite?.menu?.cards) {
        const pagesData = await graphqlRequest(gql`query findManyPage($where: PageWhereInput) {
          findManyPage(where: $where) {
            id
            name
            slug
            description
            imageObj
            isIndex
            password
            products {
              id
              name
            }
            requests {
              id
              requestStatus
              name
            }
          }
        }`, {
          where: {
            id: {
              in: websiteData?.findUniqueWebsite?.menu?.cards?.map((card) => card.id)
            },
          },
        });
        cards = websiteData?.findUniqueWebsite?.menu?.cards?.map((card) => {
          const page = pagesData?.findManyPage?.find((_page) => _page.id === card.id)
          return {
            ...card,
            ...{
              ...page,
              requests: page?.requests?.filter((request) => {
                return request?.requestStatus === 'active'
              })
            }
          }
        })
      }
      const board = Object.keys(websiteData?.findUniqueWebsite?.menu).length > 0 ? { ...websiteData?.findUniqueWebsite?.menu, cards, id: websiteData?.findUniqueWebsite?.id, slug: websiteData?.findUniqueWebsite?.slug } : { cards: [], columns: [], columnOrder: [], id: websiteData?.findUniqueWebsite?.id, slug: websiteData?.findUniqueWebsite?.slug }
      dispatch(slice.actions.getBoardSuccess(board));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createColumn({ newColumn, board }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const newColumnId = uuidv4()
      const newColumnWithId = {
        ...newColumn,
        id: newColumnId,
        cardIds: []
      }
      const menu = {
        ...board,
        cards: Object.values(board.cards),
        columnOrder: [...board.columnOrder, newColumnId],
        columns: [
          ...Object.values(board.columns),
          newColumnWithId
        ]
      }

      const data = await graphqlRequest(UpdateOneWebsiteDocument, {
        where: {
          id: board?.id,
        },
        data: {
          menu
        }
      });

      dispatch(slice.actions.createColumnSuccess(newColumnWithId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateColumn({ columnId, updateColumn, board }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const menu = {
        ...board,
        cards: Object.values(board.cards),
        columns: Object.values(board.columns).map((column) => {
          if (column.id !== columnId) {
            return column
          } else {
            return updateColumn
          }
        })
      }
      const data = await graphqlRequest(UpdateOneWebsiteDocument, {
        where: {
          id: board?.id,
        },
        data: {
          menu
        }
      });
      dispatch(slice.actions.updateColumnSuccess(updateColumn));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteColumn({ columnId, board }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const menu = {
        ...board,
        cards: board.cards ? Object.values(omit(board.cards, board?.columns[columnId].cardIds)) : [],
        columnOrder: board.columnOrder.filter((c) => c !== columnId),
        columns: Object.values(omit(board.columns, [columnId]))
      }
      const data = await graphqlRequest(UpdateOneWebsiteDocument, {
        where: {
          id: board?.id,
        },
        data: {
          menu
        }
      });

      dispatch(slice.actions.deleteColumnSuccess({ columnId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistColumn({ newColumnOrder, board }) {
  // return () => {
  //   dispatch(slice.actions.persistColumn(newColumnOrder));
  // };
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const menu = {
        ...board,
        cards: Object.values(board.cards),
        columns: Object.values(board.columns),
        columnOrder: newColumnOrder,
      }
      const data = await graphqlRequest(UpdateOneWebsiteDocument, {
        where: {
          id: board?.id,
        },
        data: {
          menu
        }
      });
      dispatch(slice.actions.persistColumn(newColumnOrder));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function persistCard({ columns, board }) {
  // return () => {
  //   dispatch(slice.actions.persistCard(columns));
  // };
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const menu = {
        ...board,
        cards: Object.values(board.cards),
        columns: Object.values(columns)
      }
      const data = await graphqlRequest(UpdateOneWebsiteDocument, {
        where: {
          id: board?.id,
        },
        data: {
          menu
        }
      });
      dispatch(slice.actions.persistCard(columns));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function addTask({ card, board, columnId }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const menu = {
        ...board,
        cards: [...Object.values(board.cards), card],
        columns: Object.values({ ...board.columns, [columnId]: { ...board.columns[columnId], cardIds: [...board.columns[columnId].cardIds, card.id] } })
      }

      const data = await graphqlRequest(UpdateOneWebsiteDocument, {
        where: {
          id: board?.id,
        },
        data: {
          menu
        }
      });

      dispatch(slice.actions.addTask({ card, columnId }));
      // window.location.assign(`/admin/Website/Website/DesignPage/?id=${card?.id}`)
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setIndexTask({ cards, board }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const menu = {
        ...board,
        cards: Object.values(cards),
        columns: Object.values(board.columns)
      }
      const indexPage = Object.values(cards).find((card) => card.isIndex)
      const data = await graphqlRequest(gql`mutation updateOnePage($data: PageUpdateInput!, $where: PageWhereUniqueInput!) {
        updateOnePage(where: $where, data: $data) {
          id
          name
          description
          isIndex
          slug
          imageObj
        }
      }`, {
        where: {
          id: indexPage?.id,
        },
        data: {
          isIndex: {
            set: true
          }
        }
      });
      dispatch(slice.actions.setIndexCard(cards));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteTask({ cardId, columnId, board }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const menu = {
        ...board,
        cards: Object.values(omit(board.cards, [cardId])),
        columns: Object.values({ ...board.columns, [columnId]: { ...board.columns[columnId], cardIds: board.columns[columnId].cardIds.filter((id) => id !== cardId) } })
      }
      const data = await graphqlRequest(UpdateOneWebsiteDocument, {
        where: {
          id: board?.id,
        },
        data: {
          menu
        }
      });
      dispatch(slice.actions.deleteTask({ cardId, columnId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };

  // return (dispatch) => {
  //   dispatch(slice.actions.deleteTask({ cardId, columnId }));
  // };
}
