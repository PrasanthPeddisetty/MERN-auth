import '../App.css';

import React, {Component} from 'react';

class ProfileCard extends Component {

  render(){
    return (
      <div className="profile">
        <div className="profile-container">
          <img src={this.props.pictureURL} alt="" height="200px" width="200px"/>
          <h1 style={{textAlign:"center"}}><a href={this.props.profileURL} target="_blank" rel="noopener noreferrer">Visit Profile</a></h1>
    <h5>Name : {this.props.firstName}</h5>
          <h2>{this.props.headline}</h2>
        </div>
      </div>
    )
  }
}

export default ProfileCard;