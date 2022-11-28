import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { signIn, useSession, signOut } from 'next-auth/react';
import {
  Navbar, Dropdown, Avatar, Card, Button,
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

  console.log(lastUserHistory.professionalId);

  if (status === 'authenticated') {
    return (
      <div>
        <Head>
          <title>HireMe | Summary</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/HireMeHead.png" />
        </Head>
        <main className={styles.summary}>
          <main className={styles.invoiceContainer}>
            <Card imgSrc="https://images.unsplash.com/photo-1596583164564-5d6e7a9e0c68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Congratulations! You have successfully hired
                {' '}
                <Link href={`/gallery/${lastUserHistory.professionalId}`} className={styles.proName}>
                  {lastUserHistory.professionalName}
                </Link>
                .
              </h5>
              <div className="font-normal text-gray-700 dark:text-gray-400">
                <p>
                  {' '}
                  The team at HireMe would like to thank you for using our services.
                  We believe that you will greatly benefit from this.
                </p>
                <br />
                <p>
                  {' '}
                  If you wish to look at our other services, please
                  {' '}
                  <Link href="/gallery?location=stockholm&service=" className={styles.clickHere}> click here</Link>
                  .
                  {' '}
                  Else you can browse our
                  {' '}
                  <Link href="/" className={styles.clickHere}> homepage</Link>
                  .
                </p>
                <br />
                <p>
                  We look forward to receiving feedbacks from you!
                </p>

              </div>
              <Button href="/account">
                Go to my account
                <svg
                  className="ml-2 -mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
              </Button>
            </Card>

          </main>

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
