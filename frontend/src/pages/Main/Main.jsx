import React from "react";
import Steps from './Steps/Steps.jsx';
import AboutUs from './AboutUs/AboutUs.jsx';
import Header from '../../components//Header/Header.jsx';
import HeaderLogin from '../../components//Header/HeaderLogin.jsx';
import Footer from '../../components//Footer/Footer.jsx';
import './Main.css';

function Main(props) {

  const {loggedIn} = props;

  return (
    <div className="main__content">
      {!loggedIn &&
        <Header/>
      }
      {loggedIn &&
        <HeaderLogin/>
      }
      <main className="profile">
        <AboutUs/>
        <Steps/>
      </main>
      <Footer/>
    </div>
  );
}  

export default Main;
