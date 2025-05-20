import React from "react";
import Header from "../components/Header";

function AboutUs() {
  return (
    <div id="aboutus" className="">
        <Header title="About Us" />
        <div className="main-content container">
          <div className="row align-items-center">
            <h2 class="mt-5">Our Vision</h2>
            <p>
              We envision a global shift where every online store runs on
              decentralized infrastructure—secure, scalable, and seamless. ATOZ
              Meta Coin is here to lead that change.
            </p>
            <h2 class="mt-5">Our Mission</h2>
            <p>
              To provide the tools and technology for eCommerce businesses to
              integrate blockchain solutions and accept crypto payments, making
              online trade truly borderless and inclusive.
            </p>

            <h2 class="mt-5">Features</h2>

            <p>
              Blockchain-Powered Payments: Secure, fast, and borderless
              transactions using ATOZ Meta Coin.
            </p>

            <p>
              Smart Contracts: Automate eCommerce processes like orders,
              refunds, and deliveries.
            </p>

            <p>
              Global Crypto Adoption: Enabling businesses to reach new markets
              with cryptocurrency.
            </p>
          </div>
        </div>
    </div>
  );
}

export default AboutUs;
