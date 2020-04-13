import React  from 'react';
import Plays from './Plays';

export default ({ t, onClick }) => {
  return (
    <Plays type='message' onClick={onClick} />
  );
};
