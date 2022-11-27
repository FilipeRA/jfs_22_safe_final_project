/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import {
  Dropdown, Avatar, TextInput, Button, Navbar,
} from 'flowbite-react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import styles from '../styles/Navbar.module.css';

const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const services = [];
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/professionals')
      .then(response => response.json())
      .then(result => {
        setData(result);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  data.map(pro => {
    if (!services.includes(pro.professionalService)) {
      services.push(pro.professionalService);
    }
    return services;
  });

  const handleLocationChange = e => {
    setLocation(e.target.value);
  };

  const handleServiceChange = e => {
    setService(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setService('');
    setLocation('');
    router.push(`/gallery?location=${location}&service=${service}`);
  };

  return (
    <Navbar
      className="navContainer"
      fluid
      rounded>

      <div className={styles.navLogo}>
        <Link href="/">
          <Navbar.Brand href="/">
            <Image src="/HireMe.jpg" width={130} height={130} alt="hire me logo" />
            {/* <img
              src="HireMe.jpg"
              className="mr-3 h-6 sm:h-9"
              alt="HireMe Logo" /> */}
          </Navbar.Brand>
        </Link>
      </div>

      <div className={styles.navSearch}>
        <form className="flex flex-row gap-4">
          <div>
            <TextInput
              type="text"
              placeholder="Skills"
              list="services-list"
              value={service}
              onChange={handleServiceChange}
              required />
            <datalist id="services-list">
              {
          services.map((element, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <option key={i} value={element}>{element}</option>
          ))
          }
            </datalist>
          </div>
          <div>
            <Autocomplete>
              <TextInput
                type="text"
                placeholder="Location"
                value={location}
                onChange={handleLocationChange}
                required />
            </Autocomplete>
          </div>
          <Button className="Submit-btn" type="submit" color="cyan" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>

      <div className={styles.navProfile}>
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
            <Navbar.Toggle />
          </div>
        ) : <Link href="/login" onClick={() => signIn()}>Login</Link>}
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">
          About
        </Navbar.Link>
        <Navbar.Link href="/contact">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>

    </Navbar>
  );
};

export default NavBar;
