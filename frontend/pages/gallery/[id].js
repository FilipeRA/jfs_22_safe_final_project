/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import {
  Button, Card, Navbar, Dropdown,
  Avatar,
} from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Details.module.css';
import navStyles from '../../styles/Navbar.module.css';

// eslint-disable-next-line max-len
// The reason for doing this get static path props function is to first tell next how many html pages needs to be made based on our data.
export const getStaticPaths = async () => {
  const response = await fetch('http://localhost:8080/api/professionals');
  const data = await response.json(); // data is an array of objects
  const paths = data.map(pro => ({
    params: { id: pro.id.toString() }, // return an object from this array
  }));
  return {
    paths, // now we telling next.js what to build using this paths
    fallback: false,
  };
};

// eslint-disable-next-line max-len
export const getStaticProps = async context => { // if there are 10 paths, this function will run 10 times
  const { id } = context.params;
  const response = await fetch(`http://localhost:8080/api/professionals/${id}`);
  const data = await response.json();
  return {
    props: { professionals: data },
  };
};

const Details = ({ professionals }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = e => {
    e.preventDefault();
    if (session) {
      const serviceHistory = {
        userName: session.user.name,
        userEmail: session.user.email,
        professionalId: professionals.id,
        professionalName: professionals.professionalName,
        professionalService: professionals.professionalService,
        totalServicePrice: professionals.professionalPrice,
        professionalImage: professionals.professionalImage,
      };

      fetch(`http://localhost:8080/api/users/${session.user.email}`, {
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify(serviceHistory),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      router.push('/loading');
    } else {
      signIn();
    }
  };

  return (
    <>
      <Head>
        <title>
          HireMe |
          {' '}
          {professionals.professionalName}
        </title>
        <meta name="keywords" content="professional" />
        <link rel="icon" href="/HireMeHead.png" />
      </Head>
      <main>
        <Card className={styles.latestCustomers}>
          <div className="flex flex-col items-center pb-10">
            <Image src={professionals.professionalImage} width={300} height={300} className="mb-3 rounded-full shadow-lg" alt="test" />
            <h5 className="mb-1 mt-1 text-xl font-medium text-gray-900 dark:text-white">
              {professionals.professionalName}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {professionals.professionalAddress}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 flex">
              <Image src="/star.png" width={20} height={20} alt="star rating" />
              {professionals.professionalRating}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {professionals.professionalPrice}
              {' '}
              SEK / hour
            </span>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <Button onClick={handleSubmit}>
                Hire
              </Button>
            </div>
          </div>

          {/* <div className="mb-4 items-center justify-between">
            <h1>Image</h1>
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{professionals.professionalName}</h5>
            <h5>{professionals.professionalAddress}</h5>
            <h5>{professionals.professionalRating}</h5>
            <h5>
              {professionals.professionalPrice}
              {' '}
              kr SEK
            </h5>
          </div> */}
          {/* <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleSubmit}>
              Hire
            </Button>
          </div> */}
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Services
            </h5>
          </div>
          {professionals.professionalHistory.map(history => (
            <div key={history.historyId} className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt="Neil image" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Client name:
                        {' '}
                        {history.userName}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Booked as:
                        {' '}
                        {history.userService}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </Card>
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
    </>
  );
};

export default Details;
