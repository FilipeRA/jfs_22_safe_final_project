/* eslint-disable max-len */
import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Card, Dropdown, Button } from 'flowbite-react';
import Map from '../../components/Map';
import styles from '../../styles/Gallery.module.css';

export const getStaticProps = async () => {
  const url = 'http://localhost:8080/api/professionals';
  const result = await fetch(url);

  return {
    props: { professionals: await result.json() },
  };
};

const Index = ({ professionals }) => {
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
        <link rel="icon" href="/HireMeHead.png" />
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
                    imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">
                    <div>
                      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {pro.professionalName}
                      </h5>
                      <span className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        {pro.professionalService}
                        {' '}
                        <div className="flex">
                          <Image src="/star.png" width={20} height={20} alt="star rating" />
                          {' '}
                          {pro.professionalRating}
                        </div>
                      </span>
                      <span className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        {pro.professionalPrice}
                        {' '}
                        SEK / hour
                      </span>
                      <span className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        {pro.professionalAddress}
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
    </div>
  );
};

export default Index;
