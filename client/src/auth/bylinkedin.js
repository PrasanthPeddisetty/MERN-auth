import React from 'react'
import Layout from '../core/Layout';
import ProfileCard from "./ProfileCard";

const Bylinkedin = (props) => {
   const info = JSON.parse(localStorage.getItem("rememberMe"))

    console.log(info)
    return (
        <Layout>
           <ProfileCard
                firstName={info.firstName}
                lastName={info.lastName}
                profileURL={info.profileURL}
                pictureURL={info.pictureURL}
              />
        </Layout>
       
    )
}
export default Bylinkedin;
