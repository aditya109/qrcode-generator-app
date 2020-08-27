import React, {Component} from 'react';
import axios from 'axios';

import './home.css';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', qrCode: 'default'};

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    getQRCode = () => {
        // const message = this.state.value;
        const message = this.state.value;
        if (this.state.value !== "") {
            axios.post(`/api/text?message=${message}`)
                .then(response => {
                    this.setState({value: "", qrCode: response.data})
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    handleDownload() {
        if (this.state.qrCode !== "default") {
            fetch(`/api/download/qrCode`).then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement("a");
                    a.href = url;
                    a.download = 'qr.html';
                    a.click();
                })
            })

        }
    }

    handleReset(event) {
        event.preventDefault();
        this.setState({value: "", qrCode: "default"});
    }

    handleTextChange(event) {
        event.preventDefault();
        this.setState({value: event.target.value, qrCode: 'default'});
    }

    handleTextSubmit(event) {
        event.preventDefault();
        if (this.state.value !== "") {
            this.getQRCode();
            this.setState({value: ''})
        }
    }

    render() {
        return (
            <div className="App">
                <div className="bg__image"/>
                <div className="main__container">
                    {/*header title*/}
                    <div className="heading__container">
                        <span>Text To QR Code Converter</span>
                    </div>
                    {/*subtitle title*/}
                    <div className="subtitle__container">
                        <p><span>Node JS Application For Converting Text to QR Code</span></p>
                    </div>
                    {/*input container*/}
                    <div className="input__container">
                        <form onSubmit={this.handleTextSubmit}>
                            <div className="input__label__container">
                                <span className="textarea__label"> Place Your Text Here : </span>
                            </div>
                            <div className="textarea__container">
                            <textarea
                                id="text"
                                value={this.state.value}
                                className="textarea"
                                name="message"
                                placeholder="👇 Text 👇"
                                onChange={this.handleTextChange}
                            />
                            </div>
                            <div className="btn__container">
                                <button className="btn" type="submit" value="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                    {/*result container*/}
                    {this.state.qrCode !== "default" ? (
                        <div className="result__container">
                            <div className="result__left__container">
                                <div className="text__label__wrapper">
                                <span className="textarea__label">
                                    <i className="far fa-hand-point-down"/> Result QR Code <i
                                    className="far fa-hand-point-down"/>
                                </span>
                                </div>
                                <div className="preview__wrapper">
                                    <img src={this.state.qrCode} alt="preview" className="preview"/>
                                </div>

                                <div className="btn__container">
                                    <button onClick={this.handleDownload} className="btn">Download</button>
                                </div>
                                <div className="btn__container">
                                    <button onClick={this.handleReset} className="btn">Reset</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="result__container">
                            <div className="result__left__container">
                                <div className="text__label__wrapper">
                                        <span className="textarea__label">
                                            <i className="far fa-keyboard"></i> Please Enter Text to Get a QR Code
                                            <i className="far fa-keyboard"></i>
                                        </span>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        )
    }

}


