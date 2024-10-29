import React from 'react';
import PackageMap from './PackageMap';

const MapCol = () => {
  return (
    <div className="items-center">
      <h2 className="text-xl font-bold text-center my-4">Search map</h2>
      <div className="items-center flex max-w-100%">
        <PackageMap />
      </div>
    </div>
  );
};

export default MapCol;
