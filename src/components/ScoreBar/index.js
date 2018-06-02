import { h } from 'preact';
import { scoreBar, scoreBarItem } from './style';

import Timer from '../Timer/index';

const ScoreBar = props => (
  <div class={scoreBar}>
    <div class="wrapper">
      <span class={scoreBarItem}>Score: {props.score}</span>
      <span class={scoreBarItem}>Time: <Timer time={props.time} /></span>
    </div>
  </div>
);

export default ScoreBar;
