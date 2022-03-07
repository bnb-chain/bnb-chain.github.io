import React from 'react';
/*import clsx from 'clsx';
import style from '../css/custom.css'
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import CardPrint from '../components/HomepageFeatures';*/
import  { Redirect } from 'react-router-dom';

export default function Home() {
  return <Redirect to='/docs/bnbIntro' />;
}