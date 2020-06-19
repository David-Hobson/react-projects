import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles/PaletteStyles";

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
        const { palette, classes } = this.props;

        const colorBoxes = this._shades.map(c => (
            <ColorBox key={c.name} name={c.name} background={c[format]} showingFullPalette={false}/>
        ));

        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${palette.id}`}>GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);