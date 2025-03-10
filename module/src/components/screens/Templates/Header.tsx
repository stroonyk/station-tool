import React from 'react';

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = ({}) => {
  return (
    <div style={{ marginBottom: '20px', marginTop: '0px' }} className="container">
      <h2 style={{ marginTop: '20px', marginBottom: '0px' }}>Templates</h2>

      <div>These are the most commonly downloaded templates</div>
    </div>
  );
};

export default Header;
