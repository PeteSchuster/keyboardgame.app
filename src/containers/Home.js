import { h, Component } from 'preact';
import { LIST } from '../helpers/letters';

const INITIAL_STATE = {
  start: false,
  win: false,
  score: 0,
  letter: '',
  list: [...LIST]
};

export default class Home extends Component {
  handleClickButton() {
    this.setState({
      start: true,
      score: 0
    });

    this.generateLetter();
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
    window.removeEventListener('keydown', this.typing);

    this.setState({
      win: true
    });
  }

  resetGame() {
    this.setState({ ...INITIAL_STATE });
    this.handleClickButton();
  }

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.handleClickButton = this.handleClickButton.bind(this);
    this.typing = this.typing.bind(this);
    this.winGame = this.winGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  render() {
    const { score, letter, start, win } = this.state;
    return (
      <section class="wrapper">
        {!start && <button onClick={this.handleClickButton} type="button">Start</button>}

        {win && <div><h1>You win!</h1><button onClick={this.resetGame} type="button">Restart?</button></div>}

        <div class="outer-wrap">
          <div class="row">
            <div class="score-wrap">
              Score:<span class="score">{score}</span>
            </div>
          </div>
        </div>

        <div class="letter-wrap">
          {letter}
        </div>
      </section>
    );
  }
}
