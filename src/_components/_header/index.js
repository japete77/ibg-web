import React, { Component } from "react";
import { hot } from "react-hot-loader";

class Header extends Component {
    render() {
        return (
            <div className="masthead">
                <div className="container h-100">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-10 align-self-end">
                            <h1 className="text-uppercase text-white font-weight-bold">EL EVANGELIO ES PODER DE DIOS PARA SALVACIÓN A TODO AQUEL QUE CREE</h1>
                            <hr className="divider my-4"/>
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 font-weight-light mb-5">Paraos en los caminos y mirad, y preguntad por los senderos antiguos cuál es el buen camino, y andad por él; y hallaréis descanso para vuestras almas. (Jeremías 6:16)</p>
                            <a className="btn btn-primary btn-xl js-scroll-trigger" href="#gospel">Saber más</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default hot(module)(Header);