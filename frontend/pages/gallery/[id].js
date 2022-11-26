/* eslint-disable react/jsx-key */
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, HiShoppingCart } from 'flowbite-react';
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
  console.log(data);
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

      console.log(serviceHistory);

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
          Hire My Skills |
          {' '}
          {professionals.professionalName}
        </title>
        <meta name="keywords" content="professional" />
      </Head>
      <div className={styles.proDetails}>
        <h1>Image</h1>
        <h2>{professionals.professionalName}</h2>
        <h3>{professionals.professionalAddress}</h3>
        <h3>{professionals.professionalRating}</h3>
        <h3>{professionals.professionalPrice}</h3>
      </div>
      <div>
        {professionals.professionalHistory.map(history => (
          <div key={history.historyId}>
            <p>{history.userName}</p>
            <p>{history.userService}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={handleSubmit}>
          Hire Me
        </Button>
      </div>
    </>
  );
};

export default Details;
