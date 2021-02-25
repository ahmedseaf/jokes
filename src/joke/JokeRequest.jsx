import React, { Component } from 'react';
import './JokeList.css';


class JokeRequest extends Component{

  constructor(props){
    super(props);

  }

  // handle counter border color by votes
  borderColor(){
    if(this.props.jokeVote >=  14) {
      return "#40ca66";
    } else if(this.props.jokeVote >= 10){
      return  "#8defa8"; 
    }else if(this.props.jokeVote >= 7){
      return  "#8defa8"; 
    }else if(this.props.jokeVote >= 5){
      return  "#59cca8"; 
    }else if(this.props.jokeVote >= 3){
      return  "#83d583"; 
    }else if(this.props.jokeVote >= 0){
      return  "#a9f1db"; 
    }else if(this.props.jokeVote < 0){
      return  "#e26a6a"; 
    }
  }


  getEmoji(){
    if(this.props.jokeVote >=  15) {
      return "em em-sweat_smile";
    }else if(this.props.jokeVote >= 12){
      return  "em em-laughing"; 
    } else if(this.props.jokeVote >= 10){
      return  "em em-blush"; 
    }else if(this.props.jokeVote >= 7){
      return  "em em-grin"; 
    }else if(this.props.jokeVote >= 5){
      return  "em em-smile"; 
    }else if(this.props.jokeVote >= 3){
      return  "em em-smiley"; 
    }else if(this.props.jokeVote >= 0){
      return  "em em-slightly_smiling_face"; 
    }else if(this.props.jokeVote <= -6){
      return  "em em-face_vomiting"; 
    }else if(this.props.jokeVote <= -4){
      return  "em em-face_with_rolling_eyes"; 
    }else if(this.props.jokeVote <= -2){
      return  " em em-confused"; 
    }else if(this.props.jokeVote <= -1){
      return  "em em-neutral_face "; 
    }
  }


  render(){
    return(
      <div className="JokeList-content">
        <div className="JokeList-control">
          <i onClick={this.props.upVotes} className="fas fa-arrow-up"></i>
          <div className="counter" style={{ borderColor: this.borderColor() }}>{this.props.jokeVote}</div>
          <i onClick={this.props.downVotes} className="fas fa-arrow-down"></i>
        </div>
        <div className="Joke-title">
          {this.props.jokeTitle}
        </div>
        <div className="JokeList-emoji">
          <i className={this.getEmoji()}></i>
        </div>
      </div>
    );
  }
}




export default JokeRequest;