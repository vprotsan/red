import * as PlayerActionType from '../actiontypes/player';

export const addPlayer = name => {
  return {
    type: PlayerActionType.ADD_PLAYER,
    name
  }
}

export const removePlayer = index => {
  return {
    type: PlayerActionType.REMOVE_PLAYER,
    index
  }
}

export const updatePlayerScore = (index, score) => {
  return {
    type: PlayerActionType.UPDATE_PLAYER_SCORE,
    index,
    score
  }
}
