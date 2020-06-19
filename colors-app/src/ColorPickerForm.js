import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles";

import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentColor: "teal",
            newColorName: ""
        }

        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value => 
            this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        );

        ValidatorForm.addValidationRule("isColorUnique", value => 
            this.props.colors.every(({ color }) => color !== this.state.currentColor)
        );
    }

    updateCurrentColor(newColor) {
        this.setState({currentColor: newColor.hex});
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handelSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };

        this.props.addNewColor(newColor);
        this.setState({ newColorName: "" });
    }

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;

        return (
            <div>
                <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} className={classes.picker} />
                <ValidatorForm onSubmit={this.handelSubmit} instantValidate={false}>
                    <TextValidator placeholder="Color Name" className={classes.colorNameInput} value={newColorName} name="newColorName" variant="filled" margin="normal" onChange={this.handleChange} validators={["required", "isColorNameUnique", "isColorUnique"]} errorMessages={["Enter a color name.", "Color name must be unique.", "Color has already been used."]}/>
                    <Button className={classes.addColor} type='submit' variant="contained" color="primary" disabled={paletteIsFull} style={{backgroundColor: paletteIsFull ? "grey" : currentColor}}>{paletteIsFull ? "Palette Full" : "Add Color"}</Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm)