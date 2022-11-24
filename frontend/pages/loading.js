import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Spinner } from 'flowbite-react';

const Loading = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      // router.go(1); // can go back and forth through the history
      router.push('/summary'); // redirect to the homepage after 3 seconds
    }, 2000);
  }, [router]);

  return (
    <div className="loading">
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <h1>Loading</h1>
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </div>
      {/* <h1>Ooooopss.....</h1>
      <h2>That page cannot be found.</h2>
      <p>
        Go back to the
        {' '}
        <Link href="/">Homepage</Link>
      </p> */}
    </div>
  );
};

export default Loading;
