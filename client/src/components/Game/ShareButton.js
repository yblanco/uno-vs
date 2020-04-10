import React from 'react';

import {
  FacebookShareButton, FacebookIcon,
  TelegramShareButton, TelegramIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
} from "react-share";

import routes from '../../routes';


export default ({ type, code }) => {
  const { location } = window;
  const { protocol = 'https', host = 'uno-vs.com/' } = location;
  const size=24;
  const round = true;
  const link = routes.getLink('join_link', { code })
  const url = `${protocol}://${host}${link}`;
  console.log(url);
  switch (type) {
    case 'facebook':
      return (
        <FacebookShareButton url={url} >
          <FacebookIcon size={24} round={true} />
        </FacebookShareButton>
      )
    case 'twitter':
      return (
        <TwitterShareButton url={url} >
          <TwitterIcon size={24} round={true} />
        </TwitterShareButton>
      );
    case 'telegram':
      return (
        <TelegramShareButton url={url} >
          <TelegramIcon size={24} round={true} />
        </TelegramShareButton>
      );
    default:
      return (
        <WhatsappShareButton url={url} >
          <WhatsappIcon size={size} round={round} />
        </WhatsappShareButton>
      );
  }
};
