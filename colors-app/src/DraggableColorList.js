import React from 'react';
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({colors, removeColor}) => {
    const listStyle = {
        height: "100%",
        display: "flex",
        alignContent: "flex-start",
        flexWrap: "wrap"
    }

    return (
        <div style={listStyle}>
            {colors.map((c, i) => <DraggableColorBox index={i} key={c.name} color={c.color} name={c.name} handleClick={() => removeColor(c.name)}/>)}
        </div>
    )
});

export default DraggableColorList;