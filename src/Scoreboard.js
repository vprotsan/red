import React, {Component} from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  players: [
    {
      name: 'Jim Hoskins',
      score: 31,
    },
    {
      name: 'Andrew Chalkley',
      score: 20,
    },
    {
      name: 'Alena Holligan',
      score: 50,
    },
  ],
};

class Scoreboard extends Component {
  constructor(props) {    /* Note props is passed into the constructor in order to be used */
        super(props);
        this.state = {
          players: [
            {
              name: 'Jim Hoskins',
              score: 31,
            },
            {
              name: 'Andrew Chalkley',
              score: 20,
            },
            {
              name: 'Alena Holligan',
              score: 50,
            },
          ]
        };
  }

  onScoreChange = (index, delta) => {
    this.state.players[index].score += delta;
    this.setState(this.state);
  }

  onAddPlayer = (name) => {
    this.state.players.push({ name: name, score: 0 });
    this.setState(this.state);
  }

  onRemovePlayer = (index) => {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  }

  render() {
    return (
      <div className="scoreboard">
        <Header players={this.state.players} />
        <div className="players">
          {this.state.players.map(function(player, index) {
             return (
               <Player
                 name={player.name}
                 score={player.score}
                 key={player.name}
                 onScoreChange={(delta) => this.onScoreChange(index, delta)}
                 onRemove={() => this.onRemovePlayer(index)}
               />
             );
           }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onAddPlayer} />
      </div>
    );
  }
}

// Move to components/Header.js
// ----------------------------------------------
function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>Scoreboard</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  players: PropTypes.array.isRequired
};

// Move to components/Stats.js
// -----------------------------------------------------------------------
function Stats(props) {
  const playerCount = props.players.length;
  const totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{playerCount}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: PropTypes.array.isRequired,
};

// Move to components/Stopwatch.js
// ------------------------------------------------------------------------
class Stopwatch extends Component{
  constructor(props) {
      super(props);
      this.state = {
        running: false,
        previouseTime: 0,
        elapsedTime: 0,
      }
  }

  componentDidMount = () => {
    this.interval = setInterval(this.onTick);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  onStart = () => {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  }

  onStop = () => {
    this.setState({
      running: false,
    });
  }

  onReset = () => {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  }

  onTick = () => {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
        previousTime: Date.now(),
      });
    }
  }

  render() {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch" >
        <h2>Stopwatch</h2>
        <div className="stopwatch-time"> {seconds} </div>
        { this.state.running ?
          <button onClick={this.onStop}>Stop</button>
          :
          <button onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }
}

// Move to components/Player.js
// ----------------------------------------------------------------------
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>✖</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter onChange={props.onScoreChange} score={props.score} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  onScoreChange: PropTypes.func.isRequired,
};

// Move to components/Counter.js
// ----------------------------------------------------------
function Counter(props) {
 return (
   <div className="counter" >
     <button className="counter-action decrement" onClick={() => props.onChange(-1)}>
       -
     </button>
     <div className="counter-score"> {props.score} </div>
     <button className="counter-action increment" onClick={() => props.onChange(1)}>
       +
     </button>
   </div>
 );
}

Counter.propTypes = {
  onChange: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

class AddPlayerForm extends Component {
  propTypes: {
    onAdd: PropTypes.func.isRequired,
  }

  constructor(){
    super();
    this.state = {
      name: ''
    }
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState({ name: name });
  }

  onSubmit = (e) => {
    if (e) e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
            placeholder="Player Name"
          />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
}

export default Scoreboard;
