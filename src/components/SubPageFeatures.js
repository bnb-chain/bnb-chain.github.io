import React from 'react';
import styles from '../components/SubPageFeatures.module.css';
import { Link } from 'react-router-dom';
import { faScrewdriver, faBook, faClipboardCheck, faBuilding, faWallet, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CardPrint() {
  return (
    <div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.card}>
          <Link to="/docs/BSCtestnet"> <div className={styles.container}>
                  <h3>  <FontAwesomeIcon icon={faScrewdriver} style={{fontSize:"1em"}}/> Start Building </h3>
                  <p>Get started building your decentalized app.</p>
              </div> </Link>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.card}>
          <Link to="/docs/validator/overview"> <div className={styles.container}>
                <h3>  <FontAwesomeIcon icon={faClipboardCheck} style={{fontSize:"1em"}}/>   Run a Validator  </h3>
                <p>Validate transactions, secure the network, and earn rewards.</p>
              </div></Link>
          </div>
        </div>
        
        <div className={styles.column}>
          <div className={styles.card}>
          <Link to="/docs/Integrate"> <div className={styles.container}>
                  <h3> <FontAwesomeIcon icon={faBuilding} style={{fontSize:"1em"}} /> Integrate Exchange  </h3>
                  <p>Follow our integration guide to ensure a seamless user experience.</p>
              </div></Link>
          </div>
        </div>
        </div>

        <div className={styles.row} style={{marginBottom:"50px"}}>
        <div className={styles.column}>
          <div className={styles.card}>
          <Link to="/docs/Wallet"> <div className={styles.container}>
                  <h3> <FontAwesomeIcon icon={faWallet} style={{fontSize:"1em"}}/> Manage Wallets </h3>
                  <p>Create a wallet, check your balance, and learn about wallet options.</p>
              </div></Link>
          </div>
        </div>
      
        <div className={styles.column}>
          <div className={styles.card}>
          <Link to="/docs/learn/intro"> <div className={styles.container}>
                  <h3> <FontAwesomeIcon icon={faBook} style={{fontSize:"1em"}} /> Learn How BSC Works  </h3>
                  <p>Get a high-level understanding of the underlying architecture.</p>
              </div></Link>

          </div>
        </div>
      
        <div className={styles.column}>
          <div className={styles.card}>
          <Link to="/docs/DEX"> <div className={styles.container}>
                  <h3> <FontAwesomeIcon icon={faChartBar} style={{fontSize:"1em"}}/> BC and Dex Trading </h3>
                  <p >Understand how to trade using Binance Chain and DEX.</p>
              </div></Link>
          </div>
        </div>
      </div>
    </div>
 
  )
}

export default CardPrint;