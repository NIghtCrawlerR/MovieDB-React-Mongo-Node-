import React, { Component } from 'react';
import './index.css'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__contacts">
                    <p>
                        <a href="tel:+380973606572"><i className="fas fa-phone"></i> +380973606572</a>
                    </p>
                    <p>
                        <a href="mailto:angelina.ratnykova@gmail.com"><i className="fas fa-envelope"></i> angelina.ratnykova@gmail.com</a>
                    </p>
                </div>
                <div className="footer__social">
                    <a href="https://github.com/NIghtCrawlerR" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/angelina-ratnykova-338154135/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://www.facebook.com/angelina.ratnicova" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-square"></i>
                    </a>
                </div>
            </footer>
        )
    }
}