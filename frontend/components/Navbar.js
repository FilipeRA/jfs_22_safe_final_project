import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Navbar = () => {
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

      <div className="logo">
        <Link href="/">
          <Image href="/" src="/favicon.ico" width={40} height={40} alt="logo" />
        </Link>
      </div>

      <form className="search">
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
      </form>

      <div className="nav--links">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </div>

    </nav>
  );
};

export default Navbar;
