import React from 'react';
import PackageMap from './PackageMap';

const MapCol = () => {
  return (
    <div className="items-center">
      <h2 className="text-xl font-bold text-center my-4">
        By finding related tools
      </h2>
      <div className="items-center flex max-w-100%">
        <PackageMap
          data={[
            { x: 0.3, y: 0.2 },
            { x: 0.8, y: 0.9 },
            { x: 0.13, y: 0.5 },
            { x: 0.18, y: 0.8 },
            { x: 0.23, y: 0.3 },
          ]}
        />
      </div>
    </div>
  );
};

export default MapCol;
