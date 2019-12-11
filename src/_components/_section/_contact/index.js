import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Iframe from 'react-iframe'

class SectionContact extends Component {
    render() {
        return (
            <div className="page-section" id="contact">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="mt-0">Contacta con nosotros</h2>
                            <hr className="divider my-4" />
                            <p className="text-muted mb-5">Si tienes alguna pregunta o sugerencia, puedes ponerte en contacto con nosotros, o si lo previeferes puede visitarnos. ¡Eres bienvenido!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 ml-auto text-center">
                            <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
                            <div>(+34) 655265911
                            <br />(+34) 673803476</div>
                            <br />
                        </div>
                        <div className="col-lg-4 mr-auto text-center">
                            <i className="fas fa-location-arrow fa-3x mb-3 text-muted"></i>
                            <div>Avenida Jane Bowles 1, Local 3
                            <br /> 29011 - Málaga</div>
                            <br />
                        </div>
                        <div className="col-lg-4 mr-auto text-center">
                            <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
                            <a className="d-block" href="mailto:info@ibgracia.es">info@ibgracia.es</a>
                            <br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <a className="portfolio-box" target="_blank" href="https://www.google.com/maps/place/Iglesia+Bautista+de+la+Gracia/@36.7437224,-4.4280121,17.1z/data=!4m5!3m4!1s0xd72f74488ed24c1:0x3c8a6ce2919d5c8b!8m2!3d36.7436445!4d-4.4268504">
                                <img className="img-fluid" src="img/map.png" alt="" />
                                <div className="portfolio-box-caption p-3">
                                    <div className="project-category text-white-50">
                                        Ver en el mapa
                                    </div>
                                    <div className="project-name">
                                        Iglesia Bautista de la Gracia
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default hot(module)(SectionContact);