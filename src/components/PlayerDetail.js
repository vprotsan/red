import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PlayerDetail = ({  selectedPlayer }) => {
  if (selectedPlayer){
    return (
      <div>
        <p>{selectedPlayer.name}</p>
        <p>{selectedPlayer.score}</p>
        <p>{selectedPlayer.created}</p>
        <p>{selectedPlayer.updated}</p>
      </div>
    )
  } else {
    return (<p>Click on a player to see more details</p>);
  }
}

PlayerDetail.propTypes = {
  selectedPlayer: PropTypes.object
}

export default PlayerDetail;
