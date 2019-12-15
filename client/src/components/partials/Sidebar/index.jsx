import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: [
        {
          id: '01',
          name: 'Home',
          icon: 'fas fa-home',
          link: '/home',
        }, {
          id: '02',
          name: 'Movies catalog',
          icon: 'fas fa-film',
          link: '/catalog/movies',
        }, {
          id: '03',
          name: 'TV Series catalog',
          icon: 'fas fa-tv',
          link: '/catalog/tv',
        }, {
          id: '04',
          name: 'Games catalog',
          icon: 'fas fa-gamepad',
          link: '/catalog/games',
        },
        {
          id: '05',
          name: 'Wishlist',
          icon: 'fas fa-heart',
          link: '/wishlist',
          requireAuth: true,
        },
        // {
        //     name: 'Books catalog',
        //     icon: 'fas fa-book-open',
        //     link: '/catalog/books'
        // },
        {
          id: '06',
          name: 'Bug report',
          icon: 'fas fa-bug',
          link: '/bug-report',
        },
      ],
    };
  }

  render() {
    const { isLogin } = this.props;
    const { navigation } = this.state;

    return (
      <div className="sidebar">
        <ListGroup className="sidebar-nav">
          {navigation.map((item, i) => (
            item.requireAuth && !isLogin
              ? null
              : (
                <ListGroup.Item key={item.id}>
                  <NavLink activeClassName="active" to={item.link}>
                    <i className={item.icon} />
                  </NavLink>
                </ListGroup.Item>
              )
          ))}

        </ListGroup>
      </div>
    );
  }
}

Sidebar.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default Sidebar;
