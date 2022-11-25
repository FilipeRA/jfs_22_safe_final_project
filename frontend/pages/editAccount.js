import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  Label, TextInput, Button, Checkbox, Select,
} from 'flowbite-react';

const EditAccount = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [user, setUser] = useState({});

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

  const handleSubmit = e => {
    e.preventDefault();
    const userAddress = {
      userAddress: session.user.name,
    };

    console.log(userAddress);
    router.push('/account');
  };

  if (status === 'authenticated') {
    return (
      <div>
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
              required>
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
      </div>
    );
  }
};

export default EditAccount;
