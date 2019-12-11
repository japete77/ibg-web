import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "../../../_services/sermons.service";
import { sermonsService } from "../../../_services/sermons.service";

class SectionSermons extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            loading: false, 
            index: 1,
            Total: 0, 
            Sermons: []
        };

        this.openUrl = this.openUrl.bind(this);
        this.next = this.next.bind(this);
    }

    componentDidMount() {
        this.next();
    }

    next() {
        this.setState({ loading: true });

        sermonsService.getSermons(this.state.index, 4, false)
            .then(response => {
                this.setState({
                    index: this.state.index + 1,
                    loading: false,
                    Total: response.Total, 
                    Sermons: this.state.Sermons.concat(response.Sermons)
                });
            });
    }

    openUrl(e, param) {
        window.open(param);
    }

    render() {
        const { Total, Sermons, loading } = this.state;
        return (
            <div className="page-section" id="messages">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="mt-0">Últimos Mensajes</h2>
                            <hr className="divider my-4" />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                    {
                        Sermons.map((item, i) =>
                        <div key={`block${i}`} className="col-lg-3 col-md-4 col-sm-6">
                            <div className="card-container">
                                <img className="card-background"
                                    src={"img/covers/" + (item.Cover ? item.Cover : "default-cover.jpg")}
                                    onClick={(e) => this.openUrl(e, 'https://s3-eu-west-1.amazonaws.com/ibg-sermons/' + item.Date + '.mp3', '_blank', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=250')}
                                />
                                <div className="card-actions">
                                    <a href={"whatsapp://send?text=" + encodeURI(item.Title + "\nhttps://s3-eu-west-1.amazonaws.com/ibg-sermons/" + item.Date + ".mp3")}>
                                        <img src="https://s3-eu-west-1.amazonaws.com/pxe-resources/whatsapp.png" alt="" />
                                    </a>
                                </div>
                                <div className="card-title">
                                    <div className="title-header">{item.Title}</div>
                                    <div className="card-body">{item.Text[0].Book} {item.Text[0].Chapter}:{item.Text[0].FromVerse}{(item.Text[0].ToVerse != item.Text[0].FromVerse) ? "-" + item.Text[0].ToVerse : ""}</div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                    </div>
                    {
                        (Total > Sermons.length) ?
                        (
                        <div className="row justify-content-center">
                        {
                            (loading) ? 
                                (
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                ) :
                                (
                                    <a className="btn btn-primary btn-xl js-scroll-trigger" onClick={this.next}>Ver más</a>
                                )
                        }
                        </div>
                        ) : ""
                    }
                </div>
            </div>
        )
    }
}

export default hot(module)(SectionSermons);