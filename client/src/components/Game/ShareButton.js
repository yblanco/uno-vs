import React, { useState } from 'react';

import {
  FacebookShareButton, FacebookIcon,
  TelegramShareButton, TelegramIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
} from "react-share";

import { CopyToClipboard } from 'react-copy-to-clipboard';


import { translate } from 'react-translate';

import Icons from '../Icons';

import routes from '../../routes';


export default translate('game')(({ t, type, code }) => {
  const [copy,setCopy] = useState(false);
  const { location } = window;
  const { protocol = 'https:', host = 'uno-vs.com/' } = location;
  const size=24;
  const round = true;
  const link = routes.getLink('join_link', { code })
  const url = `${protocol}//${host}${link}`;
  const quote = t('quote_share');
  switch (type) {
    case 'facebook':
      return (
        <FacebookShareButton quote={quote} url={url} >
          <FacebookIcon size={24} round={true} />
        </FacebookShareButton>
      )
    case 'twitter':
      return (
        <TwitterShareButton url={url} title={quote} >
          <TwitterIcon size={24} round={true} />
        </TwitterShareButton>
      );
    case 'telegram':
      return (
        <TelegramShareButton url={url} title={quote} >
          <TelegramIcon size={24} round={true} />
        </TelegramShareButton>
      );
    case 'whatsapp':
      return (
        <WhatsappShareButton url={url} title={quote} >
          <WhatsappIcon size={size} round={round} />
        </WhatsappShareButton>
      );
    default:
      return (
        <CopyToClipboard text={`${quote} ${url}`} className={`pointer ${copy && 'off'}`} onCopy={()=>setCopy(true)}>
          <Icons type='copy' size={24}   style={{ display: 'inline-block' }}  />
        </CopyToClipboard>
      )
  }
});
