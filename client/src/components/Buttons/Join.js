import React  from 'react';
import Button from './Button';

export default ({ t, onClick }) => {
  return (
    <Button type='join' onClick={onClick} />
  );
};
