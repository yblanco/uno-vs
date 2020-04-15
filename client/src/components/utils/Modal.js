import React, { useState } from 'react';
import { Content, Modal, Section } from 'react-bulma-components';

import Icons from '../Icons';


const ModalComponent = ({
  children,
  icon,
  size = 'medium',
  onClick = () => {},
  onClickName = '',
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
      <Icons className="pointer" onClick={open} size={size} type="error" size={48}  />
      <Modal show={show} onClose={close} {...props.modal}>
        <Content style={{ zIndex: 1 }}>
          <Section className='has-background-white'>
            {children}
          </Section>
        </Content>
      </Modal>
    </span>
  );
};

export default ModalComponent;
