import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  Label, TextInput, Button, Select, Navbar, Avatar, Dropdown,
} from 'flowbite-react';
import Link from 'next/link';
import styles from '../styles/EditAccount.module.css';
import navStyles from '../styles/Navbar.module.css';
import Footer from '../components/Footer';

// eslint-disable-next-line consistent-return
const EditAccount = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [user, setUser] = useState({});
  const [address, setAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (session) {
      fetch(`http://localhost:8080/api/users/${session.user.email}`, {
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(data => data.json())
        .then(res => setUser(res));
    }
  }, [session]);

  const handleAddressChange = e => {
    setAddress(e.target.value);
  };

  const handlePostCodeChange = e => {
    setPostCode(e.target.value);
  };

  const handleCountryChange = e => {
    setCountry(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userAddress = {
      userAddress: `${address}, ${postCode}, ${country}`,
    };

    fetch(`http://localhost:8080/api/users/addressChange/${session.user.email}`, {
      method: 'PATCH',
      mode: 'cors',
      body: JSON.stringify(userAddress),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    router.push('/account');
  };

  if (status === 'authenticated') {
    return (
      <div>
        <main className={styles.changeAddressForm}>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="name1"
                  value="Your name" />
              </div>
              <TextInput
                id="name1"
                type="text"
                placeholder={user.userName}
                disabled />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder={user.userEmail}
                disabled />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="address1"
                  value="Address" />
              </div>
              <TextInput
                id="address1"
                type="text"
                onChange={handleAddressChange}
                required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="postCode1"
                  value="Post Code" />
              </div>
              <TextInput
                id="postCode1"
                type="text"
                onChange={handlePostCodeChange}
                required />
            </div>
            <div id="select">
              <div className="mb-2 block">
                <Label
                  htmlFor="countries"
                  value="Select your country" />
              </div>
              <Select
                id="countries"
                onChange={handleCountryChange}
                required>
                <option selected>
                  Choose a country
                </option>
                <option>
                  Sweden
                </option>
                <option>
                  Norway
                </option>
                <option>
                  Denmark
                </option>
                <option>
                  Finland
                </option>
              </Select>
            </div>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
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

export default EditAccount;
