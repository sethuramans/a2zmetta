import React from 'react';
import { useSelector } from "react-redux";
import ReferralForm from '../components/ReferralForm';
import Header from "../components/Header";

function Home() {
  
  const { user } = useSelector((state) => state.auth);
  return (
    <section id="home" className="py-2  min-vh-100 main-section">
      <div className="container-fluid">
      <Header title='Atoz Metta'/>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div class="crypto-section">
                <h1>What is Cryptocurrency?</h1>
                <p>
                  Cryptocurrency is a digital or virtual currency that uses
                  cryptography for security. It operates independently of a
                  central authority or government, making it decentralized and
                  resistant to censorship or interference.
                </p>

                <p>
                  Some of the most well-known cryptocurrencies include Bitcoin
                  (BTC), Ethereum (ETH), and Binance Coin (BNB), but there are
                  thousands more with various features and use cases.
                </p>

                <h2>Key Features:</h2>
                <ul>
                  <li>
                    <strong>Decentralization:</strong> Operates on blockchain
                    technology, without a central authority.
                  </li>
                  <li>
                    <strong>Security:</strong> Uses advanced cryptography to
                    secure transactions.
                  </li>
                  <li>
                    <strong>Transparency:</strong> All transactions are publicly
                    verifiable on the blockchain.
                  </li>
                  <li>
                    <strong>Limited Supply:</strong> Many cryptocurrencies have
                    a maximum supply, helping control inflation.
                  </li>
                </ul>

                <p>
                  Whether you're a beginner or an experienced investor,
                  understanding how cryptocurrency works is essential in the
                  evolving world of digital finance.
                </p>

                <a
                  href="https://www.coinmarketcap.com/"
                  class="cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Market Prices
                </a>
              </div>
              
              {!user && <ReferralForm />}
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
