import React, { Component } from 'react';
import './Pokecard.css';

let padToThree = id => "0".repeat(3 - (id + "").length) + id;

class Pokecard extends Component {
    
    render() {
        let {id, name, type, exp} = this.props;
        const pokeImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padToThree(id)}.png`
        return (
            <div className="Pokecard">
                <h1>{name}</h1>
                <img src={pokeImage} alt=""/>
                <p>Type: {type}</p>
                <p>Experience: {exp}</p>
            </div>
        );
    }
}




export default Pokecard;