import React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Card } from 'flowbite-react';
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
          <Link href={`/gallery/${pro.id}`} key={pro.id} className="max-w-2xl">
            <Card
              imgAlt="Professional Image"
              imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg">

              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-between">
                <p>
                  {pro.professionalName}

                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {' '}
                  <Image src="/star.png" width={20} height={20} alt="star rating" />
                  {' '}
                  {pro.professionalRating}
                </p>
              </h5>

              <p className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {' '}
                {pro.professionalPrice}
                {' '}
                kr SEK
              </p>

              <div className="font-normal text-gray-700 dark:text-gray-400">
                {pro.professionalAddress}
              </div>
            </Card>
          </Link>

          // <Link href={`/gallery/${pro.id}`} key={pro.id} className={styles.pro}>
          //   <h2>Image</h2>
          //   <h2>{pro.professionalName}</h2>
          //   <p>
          //     <Image src="/star.png" width={20} height={20} alt="star rating" />
          //     {' '}
          //     {pro.professionalRating}
          //   </p>
          //   <p>
          //     {pro.professionalPrice}
          //     {' '}
          //     kr
          //   </p>
          // </Link>
        ))}
      </div>
      <Map professionals={filterPro} inputLocation={inputLocation} />
    </section>
  );
};

export default Index;
