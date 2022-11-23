import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Rating } from 'flowbite-react';
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
    <section className={styles.galleryContainer}>
      <div className={styles.proContainer}>
        {filterPro.map(pro => (
          <Link href={`/gallery/${pro.id}`} key={pro.id} className={styles.pro}>
            <p>Image</p>
            <p>{pro.professionalName}</p>
            <p>{pro.professionalAddress}</p>
            <p>
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  4.95
                  {' '}
                  {pro.professionalRating}
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
              </Rating>
            </p>
            <p>
              {pro.professionalPrice}
              {' '}
              kr SEK
            </p>
          </Link>
        ))}
      </div>
      <Map professionals={filterPro} inputLocation={inputLocation} />
    </section>
  );
};

export default Index;
