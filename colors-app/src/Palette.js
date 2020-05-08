import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";

import "./Palette.css"
import PaletteFooter from './PaletteFooter';

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
            <ColorBox background={c[format]} name={c.name} key={c.id} colorId={c.id} paletteId={palette.id} showLink={true}/>
        ));

        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors={true}/>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
            </div>
        )
    }
}

export default Palette;