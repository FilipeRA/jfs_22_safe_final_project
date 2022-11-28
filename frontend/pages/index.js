/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Image from 'next/image';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import Link from 'next/link';
import { signIn, useSession, signOut } from 'next-auth/react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import navStyles from '../styles/Navbar.module.css';

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>HireMe | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/HireMeHead.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <a href="https://nextjs.org">HireMe</a>
        </h1>

        <div className={styles.description}>
          <h2>
            {/* An intersection between your needs and their skills
            {' '}
            <br /> */}
            Skilled professionals at your fingertips
            {' '}
            {/* <br />
            Your needs...their skills */}
          </h2>
        </div>
        <Image src="/landingImage.jpeg" alt="landing" width={600} height={600} />

      </main>

      <nav className={navStyles.bottomNav}>
        <div className={navStyles.bottomNavLinks}>
          <Navbar.Link
            href="/"
            active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/about">
            About
          </Navbar.Link>
          <Navbar.Link href="/contact">
            Contact Us
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
