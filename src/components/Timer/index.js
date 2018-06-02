import { h } from 'preact';
import { timer } from './style';

const pad = (n, z) => {
  z = z || 2;
  return ('00' + n).slice(-z);
};

const msToTime = s => {

  const ms = s % 1000;
  s = (s - ms) / 1000;
  const secs = s % 60;
  s = (s - secs) / 60;
  const mins = s % 60;

  return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
};

const Timer = props => {
  const { time } = props;

  return (
    <span class={timer}>
      {msToTime(time)}
    </span>
  );
};

export default Timer;
