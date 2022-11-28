import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { signIn, useSession, signOut } from 'next-auth/react';
import {
  Navbar, Dropdown, Avatar,
} from 'flowbite-react';
import styles from '../styles/Summary.module.css';
import navStyles from '../styles/Navbar.module.css';
import Footer from '../components/Footer';

// eslint-disable-next-line consistent-return
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
        <Head>
          <title>HireMe | Summary</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/HireMeHead.png" />
        </Head>
        <main className={styles.summary}>
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
        </main>
        <nav className={navStyles.bottomNav}>
          <div className={navStyles.bottomNavLinks}>
            <Navbar.Link
              href="/">
              Home
            </Navbar.Link>
            <Navbar.Link href="/about">
              About
            </Navbar.Link>
            <Navbar.Link href="/contact">
              Contact
            </Navbar.Link>
          </div>
          <div className={navStyles.bottomNavProfile}>
            {session ? (
              <div className="flex md:order-2">
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={<Avatar alt="User settings" img={session.user.image} rounded />}>
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {session.user.name}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {session.user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>
                    <Link href="/account">My Account</Link>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => signOut()}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            ) : <Link href="/login" onClick={() => signIn()}>Login</Link>}
          </div>
        </nav>
        <div className={navStyles.bottomFooter}>
          <Footer />
        </div>
      </div>

    );
  }
};

export default Summary;
