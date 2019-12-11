import React, { Component } from "react";
import { hot } from "react-hot-loader";

class SectionService extends Component {
    render() {
        return (
            <div className="page-section" id="services">
                <div className="container">
                    <h2 className="text-center mt-0">Estás invitado, ¡te esperamos!</h2>
                    <hr className="divider my-4" />
                    <div className="row">
                        <div className="col-lg-6 col-md-6 text-center">
                            <div className="mt-5">
                                <i className="fas fa-4x fa-university text-primary mb-4"></i>
                                <h3 className="h4 mb-2">Reunión Principal</h3>
                                <p className="text-muted mb-0">Domingos a las 11h</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 text-center">
                            <div className="mt-5">
                                <i className="fas fa-4x fa-book text-primary mb-4"></i>
                                <h3 className="h4 mb-2">Estudio Bíblico y Oración</h3>
                                <p className="text-muted mb-0">Jueves a las 19h</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default hot(module)(SectionService);