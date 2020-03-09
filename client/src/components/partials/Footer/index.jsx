import React from 'react';
import Icon from 'components/Icon';
import './index.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__contacts">
        <p>
          <a href="tel:+380973606572">
            <Icon name="phone" />
            +380973606572
          </a>
        </p>
        <p>
          <a href="mailto:angelina.ratnykova@gmail.com">
            <Icon name="envelope" />
            angelina.ratnykova@gmail.com
          </a>
        </p>
      </div>
      <div className="footer__social">
        <a href="https://github.com/NIghtCrawlerR" target="_blank" rel="noopener noreferrer">
          <Icon prefix="fab" name="github" />
        </a>
        <a href="https://www.linkedin.com/in/angelina-ratnykova-338154135/" target="_blank" rel="noopener noreferrer">
          <Icon prefix="fab" name="linkedin" />
        </a>
        <a href="https://www.facebook.com/angelina.ratnicova" target="_blank" rel="noopener noreferrer">
          <Icon prefix="fab" name="facebook-square" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
