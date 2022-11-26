import React, { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import { Tabs, Button } from 'flowbite-react';
import styles from '../styles/Account.module.css';

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

  if (status === 'authenticated') {
    return (
      <div className={styles.tryy}>
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
            <div className="flex flex-wrap gap-2">
              <Button>
                <Link href="/editAccount" className="max-w-sm">Edit profile</Link>
              </Button>
            </div>

          </Tabs.Item>
          <Tabs.Item
            title="History">
            <div>
              History:
              {' '}
              { databaseData.userHistory
              && databaseData.userHistory.map(history => (
                <div key={history.historyId}>
                  <p>{history.professionalName}</p>
                  <p>{history.professionalService}</p>
                  <p>
                    {history.totalServicePrice}
                    {' '}
                    kr SEK
                  </p>
                </div>

              ))}
            </div>
          </Tabs.Item>
        </Tabs.Group>
      </div>
    );
  }
  return (
    <div>You are not signed in</div>
  );
};

export default Account;
