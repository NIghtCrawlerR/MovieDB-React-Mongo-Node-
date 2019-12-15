import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './index.css';

function BrickTabs(props) {
  const {
    main,
    path,
    tabs,
  } = props;

  return (
    <div className="tabs">
      <Row>
        {tabs.map((tab) => (
          <Col key={tab.value}>
            <NavLink activeClassName="active" className="nav-link" to={`${path}/${tab.link}`}>
              <Card className={main ? 'main' : ''} text="white">
                <img src={tab.img} alt="" />
                <Card.Body>
                  <Card.Title className="title">{tab.title}</Card.Title>
                  <Card.Text className="text">{tab.text}</Card.Text>
                </Card.Body>
              </Card>
            </NavLink>
          </Col>
        ))}
      </Row>
    </div>
  );
}

BrickTabs.propTypes = {
  main: PropTypes.bool.isRequired,
  path: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};

BrickTabs.defaultProps = {
  path: '',
};

export default BrickTabs;
