import "../App.css";
// import "react-s-alert/dist/s-alert-default.css";
// import "react-s-alert/dist/s-alert-css-effects/slide.css";
import React, { Component } from "react";
// import Alert from "react-s-alert";
import ProfileCard from "./ProfileCard";
import _ from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import Bylinkedin from "./bylinkedin";




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      profileURL: null,
      pictureURL: null,
    };
  }

  componentDidMount() {
      console.log("here here")
    window.addEventListener('message', this.handlePostMessage);
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
    //   Alert.success(`Login successful: ${event.data.profile.localizedFirstName}`,{position:'top'});
    }
  };

  updateProfile = (profile) => {
    console.log("profile madiiiii",profile)
      this.setState({
        isAuthorized: true,
        firstName: _.get(profile,'localizedFirstName',''),
        lastName: _.get(profile,'localizedLastName',''),
        profileURL: `https://www.linkedin.com/in/${_.get(profile,'vanityName','')}`,
        pictureURL: _.get(_.last(_.get(profile,'profilePicture.displayImage~.elements','')),'identifiers[0].identifier','')
      })
  }

  requestProfile = () => {

    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86spba3c71kv6z&scope=r_liteprofile&state=123456&redirect_uri=http://localhost:8000/callback`
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  render() {
      const obj = {"firstName" : this.state.firstName ,"lastname" : this.state.lastName,"profileURL" : this.state.profileURL,"pictureURL" : this.state.pictureURL}
    return (
      <div className="App">
      
        <div className="App-body">
        <div style={{paddingTop:"6px" ,textAlign:"left"}}> 
    <img src="https://drumup.io/static/images/linkedin-login.png" alt="nothing" width="200" height="38" onClick={this.requestProfile} />
</div>

{localStorage.setItem('rememberMe',JSON.stringify(obj) )}
{this.state.isAuthorized ? <Redirect to="/bylinkedin" /> : null} 

         
          {/* {this.state.isAuthorized &&
            (
              <ProfileCard
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                profileURL={this.state.profileURL}
                pictureURL={this.state.pictureURL}
              />
            )} */}
        </div>
      </div>
    );
  }
}

export default App;
