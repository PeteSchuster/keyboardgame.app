import { h } from 'preact';
import { overlay, content } from './style';

const Score = props => (
  <div class={overlay}>
    <div class={content}>
      {props.children}
    </div>
  </div>
);

export default Score;
