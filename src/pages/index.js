import React from 'react';
import clsx from 'clsx';
import style from '../css/custom.css'
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import CardPrint from '../components/HomepageFeatures';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={` ${siteConfig.title}`}
      description="Binance Document Start Page />">
      <main>
        <CardPrint/>
      </main>
    </Layout>
  );
}

