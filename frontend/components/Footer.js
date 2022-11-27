import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Footer = () => (
  <footer className="footer-container">

    <span className="footer--links-left">
      © Copyright 2022 SAFE. All Rights Reserved.
    </span>

    <ul className="footer--links-right">
      <li>
        {' '}
        <Link href="https://github.com/FilipeRA/jfs_22_safe_final_project">Github</Link>
      </li>
      <li>
        <Link href="https://www.salt.dev/sv-SE">Salt JFS Fall 2022</Link>
      </li>
    </ul>

  </footer>

);

export default Footer;
