import React, { Component } from 'react';
import "./ColorBox.css"

class ColorBox extends Component {
    render() {
        const {name, background} = this.props;

        return (
            <div className="ColorBox" style={{ background }}>
                <div className="copy-container">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                    <button className="copy-button">Copy</button>
                    <span className="see-more">More</span>
                </div>
            </div>
        )
    }
}

export default ColorBox;
