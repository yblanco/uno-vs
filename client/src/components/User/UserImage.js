import React  from 'react';
import { Image } from 'react-bulma-components';

export default ({ t, user }) => (
  <Image size={64} alt={user.name} src={user.picture} rounded className='profile-pic' />
);
