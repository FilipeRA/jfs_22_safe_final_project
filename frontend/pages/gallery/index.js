import React, { useMemo } from 'react';
import {
  GoogleMap, useLoadScript, MarkerF,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';

export const getStaticProps = async () => {
  const url = 'http://localhost:8080/api/professionals';
  const result = await fetch(url);

  return {
    props: { professionals: await result.json() },
  };
};

const Coordinates = async address => {
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  const thisShit = await Geocode.fromAddress(address).then(
    response => {
      const coord = response.results[0].geometry.location;
      return coord;
    },
    error => {
      console.error(error);
    },
  );
  return { props: { geoLocations: thisShit } };
};

const index = ({ professionals }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Map professionals={professionals} />
  );
};

export default index;

// console.log(Coordinates('Stockholm'));

function Map({ professionals }) {
  return (
    <GoogleMap
      zoom={13}
      center={{ lat: 59.334591, lng: 18.06324 }}
      mapContainerClassName="map-container">
      {professionals.map(professional => {
        const tn = Coordinates(professional.professionalAddress).then(data => data);

        const printTn = async () => {
          const blah = await tn;
          console.log(blah);
          return blah;
        };

        const blahblah = printTn();
        console.log(blahblah.lat);

        return (
          <MarkerF
            key={professional.id}
            position={{ lat: 59.334591, lng: 18.06324 }} />
        );
      })}
    </GoogleMap>
  );
}
