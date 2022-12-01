/* eslint-disable max-len */
import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Card, Dropdown, Button, Navbar, Avatar, Rating,
} from 'flowbite-react';
import { signIn, useSession, signOut } from 'next-auth/react';
import Map from '../../components/Map';
import styles from '../../styles/Gallery.module.css';
import navStyles from '../../styles/Navbar.module.css';

export const getStaticProps = async () => {
  const url = 'https://safe-hire-me.azurewebsites.net/api/professionals';
  const result = await fetch(url);

  return {
    props: { professionals: await result.json() },
  };
};

const Index = ({ professionals }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const data = router.query;
  const inputLocation = data.location;

  const filterPro = professionals.filter(pro => pro.professionalService.includes(data.service));

  return (
    <div>
      <Head>
        <title>HireMe | Gallery</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/HireMeHeadNew-light.png" />
      </Head>

      <main>
        <section className={styles.galleryContainer}>
          <div className={styles.proContainer}>
            <div className={styles.proNumber}>
              <p>
                {filterPro.length}
                {' '}
                available professionals
              </p>
            </div>
            <div className={styles.proGallery}>
              {filterPro.map(pro => (
                <div key={pro.id} className="max-w-2xl">
                  <Card
                    imgAlt="Professional Image"
                    imgSrc={pro.professionalImage}>
                    <div>
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {pro.professionalName}
                      </h5>
                      <span className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        {pro.professionalService}
                        {' '}
                        <div className="flex">
                          <Rating>
                            <Rating.Star />
                            <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                              {pro.professionalRating}
                            </p>
                            <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                          </Rating>
                        </div>
                      </span>
                      <span className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        {`${pro.professionalAddress.split(' ')[pro.professionalAddress.split(' ').length - 1]}`}
                      </span>
                      <span className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        {pro.professionalPrice}
                        {' '}
                        kr / hour
                      </span>

                      <div className="mt-4 flex space-x-3 lg:mt-6 justify-center">
                        <Link
                          href={`/gallery/${pro.id}`}>
                          <Button gradientMonochrome="info" className="view-profile">
                            View Profile
                          </Button>
                        </Link>
                        <div />
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Map professionals={filterPro} inputLocation={inputLocation} />
        </section>
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
    </div>
  );
};

export default Index;
