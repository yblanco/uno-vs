import React, { useState } from 'react';
import { Content, Modal, Section } from 'react-bulma-components';

import Icons from '../Icons';


const ModalComponent = ({
  children,
  icon = false,
  size = 48,
  onClick = () => {},
  onClickName = '',
  text = '',
  className='',
  ...props
}) => {
  const [show, setShow] = useState(false);
  const open = () => setShow(true);
  const close = () => setShow(false);
  // childrenWithProps = React.Children.map(children, (child) => (
  //     React.cloneElement(child, { : clickHandler })
  //   ));
  return (
    <span>
      {
        icon !== false
        ? (<Icons className="pointer" onClick={open} type={icon} size={size}  />)
        : <Content onClick={open} >{text}</Content>
      }
      <Modal show={show} onClose={close} {...props.modal}>
        <Content style={{ zIndex: 1 }}>
          <Section className={`has-background-white ${className}`}>
            {children}
          </Section>
        </Content>
      </Modal>
    </span>
  );
};

export default ModalComponent;
