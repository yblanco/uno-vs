import React, { useState, useEffect }  from 'react';
import { Box, Pagination } from 'react-bulma-components';

import Icons from '../Icons';
import GameListItem from './GameListItem';


export default ({ games = [], loaded = false, onChange=()=>{}}) => {
  const isLoaded = loaded !== false;

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const onClick = (page) => {
    setPage(page);
    onChange(page);
  }

  useEffect(() => {
    if(isLoaded) {
      setTotal(loaded)
    }
  }, [loaded, isLoaded])

  return (
    <Box className='has-background-dark box-game-list'>
      {
        isLoaded
        ? <GameListItem games={games} />
        : <Icons type='loading' size={48} />
      }
      {
        isLoaded && (
          <Pagination
            className='box-game-pager'
            autoHide
            total={total}
            current={page}
            delta={1}
            showPrevNext={false}
            onChange={onClick}
          />
        )
      }
    </Box>
  );
}
