import { h } from 'preact';
import { score } from './style';

const Score = props => (
  <div class={score}>
    <div class="wrapper">
      Score: {props.score}
    </div>
  </div>
);

export default Score;
