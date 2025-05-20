import React from 'react';
import { useSelector } from "react-redux";
import ReferralForm from '../components/ReferralForm';
import Header from "../components/Header";

function Home() {
  
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Header title="Welcome to ATOZ Meta Coin" />
      <div className="main-content container">
        <div className="row">
          <div className="col-md-12">
            <div className="crypto-section">
              <h1>Welcome to ATOZ Meta Coin</h1>
              <p>
                Revolutionizing the Future of eCommerce with Blockchain and
                Crypto
              </p>

              <p>
                ATOZ Meta Coin is your gateway to a decentralized eCommerce
                world. We are building a powerful ecosystem that empowers online
                businesses to embrace blockchain technology, enabling faster,
                safer, and more transparent transactions using cryptocurrency.
              </p>

              {!user && <ReferralForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
