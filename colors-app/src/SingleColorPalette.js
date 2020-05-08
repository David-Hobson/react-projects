import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: "hex"
        }

        this._shades = this.gatherShades(this.props.palette, this.props.colorId);

        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for(let key in allColors) {
            shades = shades.concat(allColors[key].filter(c => c.id === colorToFilterBy));
        }

        return shades.slice(1);
    }

    changeFormat(val){
        this.setState({
            format: val
        });
    }

    render() {
        const { format } = this.state;
        const { palette } = this.props;

        const colorBoxes = this._shades.map(c => (
            <ColorBox key={c.id} name={c.name} background={c[format]} showLink={false}/>
        ));

        return (
            <div className="Palette">
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji}/>
            </div>
        )
    }
}

export default SingleColorPalette;