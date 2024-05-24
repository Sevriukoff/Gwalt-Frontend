import React from 'react';

const HomeComponent = ({ children, title }) => {
  return (
      <div className='mb-10 pb-8 border-b border-b-[#f2f2f2]'>
        <h2 className="text-gray-900 text-2xl font-semibold mb-6">{ title }</h2>
        { children }
      </div>
  );
};

export default HomeComponent;