import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CardPrint from '../components/SubPageFeatures';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={` ${siteConfig.title}`}
      description="Binance Document Start Page />">
      <main>
        <CardPrint/>
        {/*<HomepageFeatures />*/}
      </main>
    </Layout>
  );
}

