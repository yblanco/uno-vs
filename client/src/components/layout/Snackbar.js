import React, { useEffect } from 'react';
import { Notification, Button } from 'react-bulma-components';
import './snackbar.css';


const Snackbar = ({ info, hideSnackbar }) => {
  const { text, type, show } = info;
  useEffect(() => {
    let timer = null;
    if (show) {
      timer = setTimeout(() => hideSnackbar(), 1500);
    }
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [show, hideSnackbar]);

  return (
    text.length > 0 && (
      <Notification
        color={type}
        className={`snackbar ${show ? 'show' : 'hide'} `}
      >
        {text}
        <Button remove onClick={hideSnackbar} />
      </Notification>
    )
  );
};

export default Snackbar;
