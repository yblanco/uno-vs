import React  from 'react';
import { Image } from 'react-bulma-components';

import Icons from '../Icons';


export default ({ t, user, size=64, icon=false }) => (
  icon
  ? <Icons type={user.picture} size={size} rounded />
  : <Image size={size} alt={user.name} src={user.picture} rounded className='profile-pic' />
);
