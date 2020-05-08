import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";

import "./Palette.css"

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level: 500,
            format: "hex"
        }

        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
    }

    changeFormat(val) {
        this.setState({
            format: val
        });
    }

    render() {
        const { palette } = this.props;
        const { level, format } = this.state;

        const colorBoxes = palette.colors[this.state.level].map(c => (
            <ColorBox background={c[format]} name={c.name} key={c.id} colorId={c.id} paletteId={palette.id}/>
        ));

        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat}/>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <div className="Palette-footer">
                    {palette.paletteName}
                    <span className="emoji">{palette.emoji}</span>
                </div>
            </div>
        )
    }
}

export default Palette;