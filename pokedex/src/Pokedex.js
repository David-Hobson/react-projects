import React, { Component } from "react";
import "./Pokedex.css"

import Pokecard from "./Pokecard";

class Pokedex extends Component {

    render() {
        let outcome = this.props.isWinner ? <h1 className="Pokedex-winner">WINNER!</h1> : <h1 className="Pokedex-loser">LOSER!</h1>;

        return(
            <div className="Pokedex">
                {outcome}
                <h3>Total Experience: {this.props.exp}</h3>
                <div className="Pokedex-cards">
                    {this.props.pokemon.map((p) => (
                        <Pokecard 
                            id={p.id}
                            name={p.name}
                            type={p.type}
                            exp={p.base_experience}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Pokedex;
