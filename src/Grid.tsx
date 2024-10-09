import React from 'react';

const ResponsiveGrid = ({first, second}: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grow">
      <div className="bg-blue-500 p-4">{first}</div>
      <div className="bg-green-500 p-4">{second}</div>
    </div>
  );
}

export default ResponsiveGrid;