import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Layout from "./../components/Layout/Layout";


const HomePage = () => {
  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* banner image */}
      <img
        src="/src/assets/vikas.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
       <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/src/assets/vikasimage.jpg"
            className="vks_image"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <h2>Name: Vikas Kumar Singh</h2>
          <h3>Position: Full Stack Developer</h3>
          <h4>Location: Chandigarh</h4>
          <h5>Qualification: B-Tech(CSE)</h5>
          <br/>
          <p className="text-justify mt-2">
            <b>Any query and info about the project feel free to call anytime we 24X7
            vaialible-:</b>
          </p>
          <p className="mt-3">
            <strong>Email-: <a href="mailto:ranavikas5singh@gmail.com">ranavikas5singh@gmail.com</a></strong>
          </p>
          <p className="mt-3">
          <strong>Mobile No-: <a href="tel:9877805749">9877805749</a></strong>
          </p>
          <p className="mt-3">
            <strong>Github-: <a href="https://github.com/vikas5singh/">vikas5singh</a></strong>
          </p>
          <p className="mt-3">
            <h2><strong>Thank You</strong></h2>
          </p>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default HomePage;
