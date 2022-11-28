/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import {
  useSession, getSession, signIn, signOut,
} from 'next-auth/react';
import Link from 'next/link';
import {
  Tabs, Button, Card, Navbar, Dropdown, Avatar,
} from 'flowbite-react';
import Head from 'next/head';
import styles from '../styles/Account.module.css';
import navStyles from '../styles/Navbar.module.css';
import Footer from '../components/Footer';

export const getServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }

  return {
    props: { session },
  };
};

// eslint-disable-next-line consistent-return
const Account = () => {
  const { data: session, status } = useSession();
  const [databaseData, setDatabaseData] = useState({});

  useEffect(() => {
    if (session) {
      const user = {
        userName: session.user.name,
        userEmail: session.user.email,
      };

      fetch('http://localhost:8080/api/users/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(data => data.json())
        .then(res => setDatabaseData(res));
    }
  }, [session]);

  if (status === 'authenticated') {
    return (
      <div>
        <Head>
          <title>HireMe | My Account</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/HireMeHead.png" />
        </Head>
        <main className={styles.account}>
          <Tabs.Group
            aria-label="Tabs with underline"
            className="justify-center align-middle"
          // eslint-disable-next-line react/style-prop-object
            style="underline">
            <Tabs.Item active title="Profile">
              <Card className={styles.latestServices}>
                <div className="accountContainer flex flex-col justify-center align-middle items-center">
                  <img className="accountProfile" src={session.user.image} alt="profile" style={{ borderRadius: '50px' }} />
                  <h5 className="text-2xl">
                    Welcome,
                    {' '}
                    {databaseData.userName}
                    !
                  </h5>
                </div>
                <div className="flex flex-col items-center mt-2">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {databaseData.userEmail}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {databaseData.userAddress}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-2">
                  <Button>
                    <Link href="/editAccount" className="max-w-sm">Edit profile</Link>
                  </Button>
                </div>
              </Card>
            </Tabs.Item>
            <Tabs.Item
              title="History">
              <Card className={styles.latestServices}>
                <div className="mb-4 flex items-center justify-between">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Latest Services
                  </h5>
                </div>
                {databaseData.userHistory
              && databaseData.userHistory.map(history => (
                <div key={history.historyId} className="flow-root">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                      <div className="flex space-x-4">
                        <div className="shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            alt={history.professionalName}
                            src={history.professionalImage} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {history.professionalName}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {history.professionalService}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {history.totalServicePrice}
                          {' '}
                          kr SEK
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

              ))}
              </Card>

              {/* <div>
              History:
              {' '}
              { databaseData.userHistory
              && databaseData.userHistory.map(history => (
                <div key={history.historyId}>
                  <p>{history.professionalName}</p>
                  <p>{history.professionalService}</p>
                  <p>
                    {history.totalServicePrice}
                    {' '}
                    kr SEK
                  </p>
                </div>

              ))}
            </div> */}
            </Tabs.Item>
          </Tabs.Group>
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
  // return (
  //   <div>
  //     <Head>
  //       <title>HireMe | My Account</title>
  //       <meta name="description" content="Generated by create next app" />
  //       <link rel="icon" href="/HireMeHead.png" />
  //     </Head>
  //     <h1>You are not signed in</h1>
  //   </div>
  // );
};

{ /*
              //  <div key={history.historyId}>
              //     <p>{history.professionalName}</p>
              //     <p>{history.professionalService}</p>
              //     <p>
              //       {history.totalServicePrice}
              //       {' '}
              //       kr SEK
              //     </p>
              //   </div> */ }

export default Account;

{ /* <div className="max-w-sm">
  <Card>
    <div className="mb-4 flex items-center justify-between">
      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Latest Customers
      </h5>
    </div>
    <div className="flow-root">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <div className="shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                alt="Neil image"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                Neil Sims
              </p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                email@windster.com
              </p>
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              $320
            </div>
          </div>
        </li>
      </ul>
    </div>
  </Card>
</div> */ }
