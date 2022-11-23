import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import {
  Dropdown, Avatar, Label, Select, TextInput, Checkbox, Button, Navbar,
} from 'flowbite-react';
import styles from '../styles/Home.module.css';

const Navbarr = () => {
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
      .then(res => res.json())
      .then(data => {
        setData(data);
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
    <nav>
      <Navbar.Brand href="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Hire My Skills
        </span>
      </Navbar.Brand>

      {/* <div className="logo">
        <Link href="/">
          <Image href="/" src="/favicon.ico" width={40} height={40} alt="logo" />
        </Link>
      </div> */}

      {/* <form className="search">
        <input
          className="servicesInput"
          type="text"
          list="services-list"
          value={service}
          onChange={handleServiceChange} />
        <datalist id="services-list">
          {
          services.map((service, i) => (
            <option key={i} value={service}>{service}</option>
          ))
          }
        </datalist>
        <input
          className="locationInput"
          type="text"
          value={location}
          onChange={handleLocationChange} />
        <button
          type="submit"
          onClick={handleSubmit}>
          Search
        </button>
      </form> */}

      <form className="flex flex-row gap-4">
        <div>
          <TextInput
            type="text"
            placeholder="service"
            list="services-list"
            value={service}
            onChange={handleServiceChange}
            required />
          <datalist id="services-list">
            {
          services.map((service, i) => (
            <option key={i} value={service}>{service}</option>
          ))
          }
          </datalist>
        </div>
        <div>
          <TextInput
            type="text"
            placeholder="location"
            value={location}
            onChange={handleLocationChange}
            required />
        </div>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </form>

      <div className="nav--links">

        <Link href="/">Home</Link>
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>

        {session
          ? (
            <div>
              {/* https://flowbite-react.com/dropdown/ */}
              <Dropdown
                label={<Avatar alt="User settings" img={session.user.image} rounded />}
                arrowIcon={false}
                inline>
                <Dropdown.Header>
                  <span className="block text-sm">
                    {session.user.name}
                  </span>
                  <span className="block truncate text-sm font-medium">
                    {session.user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link href="/account">
                    Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  History
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => signOut()}>
                  Sign out
                </Dropdown.Item>
              </Dropdown>
            </div>
          )
          : <Link href="/login" onClick={() => signIn()}>Login</Link> }
      </div>

    </nav>
  );
};

export default Navbarr;
