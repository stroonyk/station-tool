import React, { useEffect, useState, useRef, useMemo } from 'react';
export interface IBrowseProps {
  refresh: boolean;
}

const Browse = ({ refresh }: IBrowseProps) => {
  useEffect(() => {
    const onScroll = () => {
      console.log('bob');
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div style={{ height: '200vh' }}>Scroll me!</div>
    </>
  );
};

export default Browse;
