import React  from 'react';

export default ({ number, active, onClick }) => {
  const isActive = number === active;
  let background = 'white';
  switch (number) {
    case 2:
        background = 'info'
      break;
    case 3:
        background = 'warning'
      break;
    case 4:
        background = 'success'
      break;
    default:

  }

  return (
    <div
      onClick={() => onClick(number)}
      className={
        `form-player-number has-background-${background}  ${isActive && 'active'} pointer`
      }
    >
      {number}
    </div>
  );
}
