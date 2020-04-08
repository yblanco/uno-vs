import React  from 'react';
import { Image } from 'react-bulma-components';

export default ({ t, user, size=64 }) => (
  <Image size={size} alt={user.name} src={user.picture} rounded className='profile-pic' />
);
