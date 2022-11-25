import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Card } from 'flowbite-react';
import styles from '../styles/Summary.module.css';

const Summary = () => {
  const { data: session, status } = useSession();

  const [lastUserHistory, setLastUserHistory] = useState({});

  useEffect(() => {
    if (session) {
      fetch(`http://localhost:8080/api/users/history/${session.user.email}`, {
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(data => data.json())
        .then(res => setLastUserHistory(res));
    }
  }, [session]);

  if (status === 'authenticated') {
    return (
      <div>
        <h1>SUMMARY</h1>

        <div className={styles.invoiceContainer}>
          <h2>
            Professional:
            {' '}
            {lastUserHistory.professionalName}
          </h2>

        </div>

        <Link href="/">
          <p>Back to Homepage</p>
        </Link>
      </div>

    );
  }
};

export default Summary;
