import React from 'react';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';
import bclogo from '../../static/img/assets/chain/chain-h.png';
import bsclogo from '../../static/img/assets/chain-smart-bsc/chain-smart-bsc-h.png';
import dexlogo from '../../static/img/assets/dex/dex-h.png';

function CardPrint() {
  return (
    <div>
      <div className={styles.row}>
      <div className={styles.column}>
        <div className={styles.card}>
        <Link to="/bc-start">
              <img alt={bnblogo} src={bclogo} style={{width: "100%", height: "100%"}}/>
          </Link>
        </div>
      </div>

      <div className={styles.column}>
        <div className={styles.card}>
          <Link to="/bc-start">
              <img src={bsclogo} style={{width: "100%"}}/>
          </Link>
        </div>
      </div>
      
      <div className={styles.columnn}>
        <div className={styles.card}>
        <Link to="/bc-start">
            <img src={dexlogo} style={{width: "100%"}}/>
        </Link>
        </div>
      </div>
      
    </div>
    </div>
    
  )
}

export default CardPrint;