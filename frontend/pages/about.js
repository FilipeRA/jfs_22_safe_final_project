import React from 'react';
import styles from '../styles/About.module.css';

const about = () => (
  <div className={styles.aboutContainer}>
    <h2>What we still need to do:</h2>
    <ul>
      <li>Deploy to Azure</li>
      <li>Populate different pages, e.g. landing page, about, contact</li>
      <li>Add pictures to the professionals</li>
      <li>Upload userImage functionality(?)</li>
      <li>Fix the pop-up markers in the map</li>
      <li>
        Fix the CSS and make it mobile first. This includes Professional,
        invoice, landing, contact, account (profile, history)
      </li>
      <li>Remove footer from gallery/map page</li>
      <li>Add number of professionals at the top of the gallery</li>
    </ul>
    <h2>How we could further develop the app:</h2>
    <ul>
      <li>Add calendar functionality</li>
      <li>Add chat functionality between user and professional</li>
      <li>Add payment functionality</li>
    </ul>
  </div>

);

export default about;
