import React, { Component } from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ColorBox.css"

class ColorBox extends Component {
    render() {
        const {name, background} = this.props;

        return (
            <CopyToClipboard text={background}>
                <div className="ColorBox" style={{ background }}>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                        <span className="see-more">More</span>
                    </div>
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox;
