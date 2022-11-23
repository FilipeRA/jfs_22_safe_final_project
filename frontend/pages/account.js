import React, { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import { Tabs } from 'flowbite-react';

export const getServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }

  return {
    props: { session },
  };
};

const Account = () => {
  const { data: session, status } = useSession();
  const [databaseData, setDatabaseData] = useState({});

  useEffect(() => {
    if (session) {
      const user = {
        userName: session.user.name,
        userEmail: session.user.email,
      };

      fetch('http://localhost:8080/api/users/', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(data => data.json())
        .then(res => setDatabaseData(res));
    }
  }, [session]);

  console.log(databaseData);

  if (status === 'authenticated') {
    return (
      <div>
        <img src={session.user.image} alt="profile-image" style={{ borderRadius: '50px' }} />
        <h1>
          Welcome,
          {' '}
          {databaseData.userName}
          !
        </h1>
        <Tabs.Group
          aria-label="Tabs with underline"
          // eslint-disable-next-line react/style-prop-object
          style="underline">
          <Tabs.Item active title="Profile">
            <p>
              Email:
              {' '}
              {databaseData.userEmail}
            </p>
            <p>
              Address:
              {' '}
              {databaseData.userAddress}
            </p>
          </Tabs.Item>
          <Tabs.Item
            title="History">
            <p>
              History:
              {' '}
              {databaseData.userHistory}
            </p>
          </Tabs.Item>
          <Tabs.Item title="Settings">
            Settings content
          </Tabs.Item>
          <Tabs.Item title="Contacts">
            Contacts content
          </Tabs.Item>
          <Tabs.Item
            disabled
            title="Disabled">
            Disabled content
          </Tabs.Item>
        </Tabs.Group>

        {/* <button type="submit" onClick={() => signOut()}>Sign out</button> */}
      </div>
    );
  }
  return (
    <div>You are not signed in</div>
  );
};

export default Account;
