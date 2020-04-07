import React, { Component } from 'react';
import Joke from "./Joke";
import axios from "axios";
import "./JokeList.css";

const API_URL = "https://icanhazdadjoke.com/";

class JokeList extends Component {
    static defaultProps = {
        nJokes: 10
    }

    constructor(props) {
        super(props);

        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
            loading: false
        }

        this.seenJokes = new Set(this.state.jokes.map(j => j.id));

        this.handleVote = this.handleVote.bind(this);
        this.getJokes = this.getJokes.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if(this.state.jokes.length === 0) this.getJokes();
    }

    handleVote(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(j => j.id === id ? {...j, votes: j.votes + delta} : j)
        }),() => {
            window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
        });
    }

    async getJokes(){
        try {
            let newJokes = [];

            while(newJokes.length < this.props.nJokes) {
                let response = await axios.get(API_URL, {
                    headers: {
                        Accept: "application/json"
                    }
                })

                if(!this.seenJokes.has(response.data.id)) {
                    newJokes.push({...response.data, votes: 0});
                    this.seenJokes.add(response.data.id);
                }
            }

            this.setState(st => ({
                jokes: [...st.jokes, ...newJokes],
                loading: false
            }),() => {
                window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
            });

        }catch(e) {
            alert(e);
            this.setState({ loading: false });
        }
    }

    handleClick() {
        this.setState({ loading: true }, this.getJokes)
    }
    
    render() {
        if(this.state.loading) {
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin"></i>
                    <h1 className="JokeList-title">Loading...</h1>
                </div>
            )
        }

        let sortedJokes = this.state.jokes.sort((a,b) => b.votes - a.votes);
        let renderJokes = sortedJokes.map(j => <Joke key={j.id} id={j.id} text={j.joke} votes={j.votes} handleVote={this.handleVote}/>);

        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title"><span>Dad</span> Jokes!</h1>
                    <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt=""/>
                    <button className="JokeList-getmore" onClick={this.handleClick}>Fetch Jokes</button>
                </div>
                <div className="JokeList-jokes">
                    {renderJokes}
                </div>
            </div>
        );
    }
}

export default JokeList;