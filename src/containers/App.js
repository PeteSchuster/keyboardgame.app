import { h, Component } from 'preact';
import { LIST } from '../helpers/letters';

import ScoreBar from '../components/ScoreBar/index';
import Overlay from '../components/Overlay/index';
import Timer from '../components/Timer/index';

if (module.hot) {
  require('preact/debug');
}

const INITIAL_STATE = {
  start: false,
  win: false,
  score: 0,
  letter: '',
  time: 0,
  list: [...LIST]
};

export default class Game extends Component {
  handleClickButton() {
    this.setState({
      start: true,
      score: 0
    });

    this.generateLetter();
    this.startTimer();
    window.addEventListener('keydown', this.typing);
  }

  typing(event) {
    const typed = String.fromCharCode(event.which).toLowerCase();

    if (typed !== this.state.letter) {
      return;
    }

    this.setState(prevState => ({ score: prevState.score + 1 }));
    this.generateLetter();

    if (this.state.score === LIST.length) {
      this.winGame();
    }
  }

  generateLetter() {
    const list = this.state.list;
    const random = Math.floor((Math.random() * list.length));
    const letter = list[random];
    this.setState({
      letter,
      list: list.filter(l => l !== letter)
    });
  }

  winGame() {
    clearInterval(this.timer);
    window.removeEventListener('keydown', this.typing);

    this.setState({
      win: true
    });
  }

  resetGame() {
    this.setState({ ...INITIAL_STATE });
    this.handleClickButton();
  }

  startTimer() {
    this.setState({
      startTime: new Date()
    });

    this.timer = setInterval(() => {
      const time = new Date() - this.state.startTime;
      this.setState({
        time
      });
    }, 1);
  }

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.handleClickButton = this.handleClickButton.bind(this);
    this.typing = this.typing.bind(this);
    this.winGame = this.winGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.timer = null;
  }

  render() {
    const { score, letter, start, win, time } = this.state;
    return (
      <div class="page-app">
        <ScoreBar score={score} time={time} />
        <div class="page-content">
          <main class="page-main wrapper">
            <div class="letter-wrap">
              {letter}
            </div>
          </main>

          {!start && <Overlay><button class="button" onClick={this.handleClickButton} type="button">Start</button></Overlay>}
          {win && <Overlay><h1>You win!</h1><p><Timer time={time} /></p><button class="button" onClick={this.resetGame} type="button">Restart?</button></Overlay>}
        </div>
      </div>
    );
  }
}
