import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    googleMapsApiKey: 'AIzaSyCDzX4gqAme3GnWVA-Revqa6I4y-9BPR7E',
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
            <h2>Image</h2>
            <h2>{pro.professionalName}</h2>
            <p>
              <Image src="/star.png" width={20} height={20} alt="star rating" />
              {' '}
              {pro.professionalRating}
            </p>
            <p>
              {pro.professionalPrice}
              {' '}
              kr
            </p>
          </Link>
        ))}
      </div>
      <Map professionals={filterPro} inputLocation={inputLocation} />
    </section>
  );
};

export default Index;
