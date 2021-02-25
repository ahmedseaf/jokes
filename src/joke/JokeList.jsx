import React, { Component } from 'react';
import uuid from 'uuid/dist/v4';
import axios from 'axios';
import JokeRequest from './JokeRequest';
import LoadingSpin from './LoadingSpin';
import './JokeList.css';

class JokeList extends Component{
  static defaultProps = {
    numOfJokePerRequest : 10
  };

  constructor(props){
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("localJokes") || "[]"),
      loading: false
    };

    this.uniqueJoke = new Set(this.state.jokes.map(j => j.joke));
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if(this.state.jokes.length === 0) this.handleClick()
  }

  handleClick(){
    this.setState({loading: true}, this.getRequestJoke);
  }
  // handle Click To Get Request jokes
  async getRequestJoke(){
    try{
      let jokes = [];
      while(jokes.length < this.props.numOfJokePerRequest) {
        let res = await axios.get("https://icanhazdadjoke.com/", {headers: {Accept: "application/json"}});
        
        // check if old joke exist before add a new joke
        let newJoke = res.data.joke;
        if(! this.uniqueJoke.has(newJoke)) {
          jokes.push({id:uuid() ,joke: res.data.joke, votes: 0}); 
        }
      } 
      this.setState(
        st => ({
          loading: false,
          jokes: [...st.jokes, ...jokes]
      }));
      window.localStorage.setItem("localJokes", JSON.stringify(jokes)); 
    }catch(e){
      alert(e)
    }
  }

  // Handle Votes Add Or Down Votes
  handleVote(id, counterVote){
    this.setState(
      st => ({
        jokes: st.jokes.map(j => j.id === id ? {...j, votes: j.votes + counterVote} : j)
      }),
      () => window.localStorage.setItem("localJokes", JSON.stringify(this.state.jokes))
    )
  }

  render(){
    // Get Jokes OrderBy Vote - make sort
    let jokesOrderByVotes = this.state.jokes.sort((a,b) => b.votes - a.votes);
    return(
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <div className="Sidebar-title">Omar<span> Adam</span></div>
          <div className="Sidebar-icon"><i className="em em-face_with_hand_over_mouth"></i></div>
          <div className="Sidebar-control">
            <button disabled={this.state.loading} onClick={this.handleClick}>Get Joke</button>
          </div>
        </div>
        <div className="JokeList-content-container">
          {this.state.loading && <LoadingSpin />}
 
          {jokesOrderByVotes.map(j => ( 
            <JokeRequest key={j.id} 
              jokeId={j.id} 
              jokeTitle={j.joke} 
              jokeVote={j.votes}
              upVotes={() => this.handleVote(j.id, 1)}
              downVotes={() => this.handleVote(j.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }

}

export default JokeList;
