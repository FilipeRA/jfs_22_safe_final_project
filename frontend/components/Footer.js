import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Footer = () => (
  <div className="footer-container">
    <footer className={styles.footer}>
      Copyright 2022 SAFE
      <Link href="https://github.com/FilipeRA/jfs_22_safe_final_project">
        Github
      </Link>
      Salt JFS Fall 2022
    </footer>
  </div>

);

export default Footer;
