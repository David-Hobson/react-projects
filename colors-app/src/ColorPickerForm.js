import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

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
        const { paletteIsFull } = this.props;
        const { currentColor, newColorName } = this.state;

        return (
            <div>
                <ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} />
                <ValidatorForm onSubmit={this.handelSubmit}>
                    <TextValidator value={newColorName} name="newColorName" onChange={this.handleChange} validators={["required", "isColorNameUnique", "isColorUnique"]} errorMessages={["Enter a color name.", "Color name must be unique.", "Color has already been used."]}/>
                    <Button type='submit' variant="contained" color="primary" disabled={paletteIsFull} style={{backgroundColor: paletteIsFull ? "grey" : currentColor}}>{paletteIsFull ? "Palette Full" : "Add Color"}</Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default ColorPickerForm;