import React, { useState, useEffect } from 'react';
import {
  GoogleMap, MarkerF,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';
import styles from '../styles/Gallery.module.css';

const Coordinates = async address => {
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  const geoLocations = await Geocode.fromAddress(address)
    .then(res => res.results[0].geometry.location)
    .catch(error => console.error(error));
  return geoLocations;
};

const Map = ({ professionals }) => {
  const [coords, setCoords] = useState([]);
  console.log(professionals);

  useEffect(
    () => {
      if (professionals) {
        Promise.all(
          professionals.map(
            pro => Coordinates(pro.professionalAddress),
          ),
        ).then(coordArr => {
          setCoords(coordArr);
        });
      }
    },
    [professionals],
  );

  return (
    <GoogleMap
      zoom={12}
      center={{ lat: 59.334591, lng: 18.06324 }}
      mapContainerClassName={styles.mapContainer}>
      {coords.map((coord, i) => (
        <MarkerF
          key={professionals[i].id}
          position={coord} />
      ))}
    </GoogleMap>
  );
};

export default Map;
