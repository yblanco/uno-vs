import React  from 'react';

export default ({ number, active, onClick }) => {
  const background = number === active ? 'grey' : 'grey-lighter pointer';
  const color = number === active ? 'has-text-white' : '';
  return (
    <div
      onClick={() => onClick(number)}
      className={`form-player-number has-background-${background} ${color}`}
    >
      {number}
    </div>
  );
}
