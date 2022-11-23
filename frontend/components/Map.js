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
    // eslint-disable-next-line no-console
    .catch(error => console.error(error));
  return geoLocations;
};

const Map = ({ professionals, inputLocation }) => {
  const [coords, setCoords] = useState([]);
  const [centerCoords, setCenterCoords] = useState([]);

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

  useEffect(
    () => {
      if (inputLocation) {
        Promise.all([Coordinates(inputLocation)]).then(location => {
          setCenterCoords(location);
        });
      }
    },
    [inputLocation, professionals],
  );

  return (
    <GoogleMap
      zoom={13}
      center={centerCoords[0]}
      mapContainerClassName={styles.mapContainer}>
      <MarkerF position={centerCoords[0]} icon="/youAreHere.png" label={inputLocation} />
      {coords.map((coord, i) => (
        <MarkerF
          key={professionals[i].id}
          icon="/label.png"
          className={styles.markerStyle}
          label={{
            text: `${professionals[i].professionalPrice.toString()} kr SEK`,
            color: '#FFFFF',
            fontSize: '10px',
            fontWeight: 'bold',
          }}
          position={coord} />
      ))}
    </GoogleMap>
  );
};

export default Map;
