/* eslint-disable react/jsx-key */
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, HiShoppingCart, Card } from 'flowbite-react';
import styles from '../../styles/Details.module.css';

// eslint-disable-next-line max-len
// The reason for doing this get static path props function is to first tell next how many html pages needs to be made based on our data.
export const getStaticPaths = async () => {
  const response = await fetch('http://localhost:8080/api/professionals');
  const data = await response.json(); // data is an array of objects
  console.log(data);
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
          <div className="mb-4 items-center justify-between">
            <h1>Image</h1>
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{professionals.professionalName}</h5>
            <h5>{professionals.professionalAddress}</h5>
            <h5>{professionals.professionalRating}</h5>
            <h5>
              {professionals.professionalPrice}
              {' '}
              kr SEK
            </h5>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleSubmit}>
              Hire Me
            </Button>
          </div>
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
                        {history.userName}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {history.userService}
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
      </main>
    </>
  );
};

export default Details;

// <div key={history.historyId}>
//   <p>{history.userName}</p>
//   <p>{history.userService}</p>
// </div>
