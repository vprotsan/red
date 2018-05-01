import * as PlayerActionType from '../actiontypes/player';

const initialState = {
  players: [
    {
      name: 'Jim Hoskins',
      score: 31,
      created: '11/08/2015',
      updated: '12/08/2015'
    },
    {
      name: 'Andrew Chalkley',
      score: 20,
      created: '11/08/2016',
      updated: '12/08/2016'
    },
    {
      name: 'Alena Holligan',
      score: 50,
      created: '11/08/2017',
      updated: '12/08/2017'
    },
  ],
  selectedPlayerIndex: -1
}

function Player(state=initialState, action){
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();

  switch(action.type){
    case PlayerActionType.ADD_PLAYER: {
      const addPlayerList = [...state.players, {
        name: action.name,
        score: 0,
        created: `${month}/${day}/${year}`
      }];
      return {
        ...state,
        players: addPlayerList
      }
    }

    case PlayerActionType.REMOVE_PLAYER:
      const removePlayerList = [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
      return {
        ...state,
        players: removePlayerList
      }

    case PlayerActionType.UPDATE_PLAYER_SCORE:
      const updatePlayerList = state.players.map((player, index) => {
        if(index === action.index){
          return {
            ...player,
            score: player.score + action.score,
            updated: `${month}/${day}/${year}`
          }
        }
        return player;
      })
      return {
				...state,
				players: updatePlayerList
			};

    case PlayerActionType.SELECT_PLAYER:
      return {
        ...state,
        selectedPlayerIndex: action.index
      }

    default:
      return state
  }
}

export default Player;
