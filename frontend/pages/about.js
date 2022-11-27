import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import styles from '../styles/About.module.css';

const about = () => (
  <div>
    <Head>
      <title>HireMe | About</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/HireMeHead.png" />
    </Head>
    <main className={styles.aboutContainer}>
      <h2 className={styles.listTitle}>Techstack we used:</h2>
      <ul className={styles.list}>
        <li>Next.JS 13.</li>
        <li>Google authentication.</li>
        <li>Google Map API.</li>
        <li>Spring Boot.</li>
        <li>MongoDB.</li>
        <li>Deployment in Azure.</li>
      </ul>
      <h2 className={styles.listTitle2}>How we could further develop the app:</h2>
      <ul className={styles.list2}>
        <li>Add calendar functionality</li>
        <li>Add chat functionality between user and professional</li>
        <li>Add payment functionality</li>
      </ul>
    </main>
    <Footer />
  </div>

);
export default about;
