import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const data = router.query;
  console.log(data);

  const filterPro = professionals.filter(pro => pro.professionalService.includes(data.service));
  console.log(filterPro);

  return (
    <section className={styles.galleryContainer}>
      <div className={styles.proContainer}>
        {filterPro.map(pro => (
          <Link href={`/gallery/${pro.id}`} key={pro.id} className={styles.pro}>
            <h2>Image</h2>
            <h2>{pro.professionalName}</h2>
            <p>{pro.professionalRating}</p>
            <p>{pro.professionalPrice}</p>
          </Link>
        ))}
      </div>
      <Map professionals={filterPro} />
    </section>
  );
};

export default Index;
