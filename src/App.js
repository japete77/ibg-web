import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Header from './_components/_header';
import SectionGospel from './_components/_section/_gospel';
import SectionService from './_components/_section/_service';
import SectionContact from './_components/_section/_contact';
import SectionSermons from './_components/_section/_sermons';

import "./App.scss";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
                    <div className="container">
                        <a className="navbar-brand js-scroll-trigger" href="#page-top">
                            <img className="logo" src="img/ibg-logo.svg" />
                            <span className="d-none d-sm-block"> Iglesia Bautista de la Gracia</span>
                        </a>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto my-2 my-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" href="#gospel">El Evangelio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" href="#services">Reuniones</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" href="#messages">Mensajes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" href="#contact">Contacta</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Header/>
                <SectionGospel/>
                <SectionService/>
                <SectionSermons/>
                <SectionContact/>
            </div>
        );
    }
}

export default hot(module)(App);