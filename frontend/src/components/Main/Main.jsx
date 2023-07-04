import React from "react";
import Steps from './Steps/Steps.jsx';
import AboutUs from './AboutUs/AboutUs.jsx';
import Header from '../Header/Header.jsx';
import HeaderLogin from '../Header/HeaderLogin.jsx';
import Footer from '../Footer/Footer.jsx';
import './Main.css';

function Main(props) {

  const {loggedIn} = props;

  return (
    <page className="main__content">
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
    </page>
  );
}  

export default Main;
