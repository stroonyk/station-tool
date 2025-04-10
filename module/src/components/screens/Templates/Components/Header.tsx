import React from 'react';

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = ({}) => {
  return (
    <div className="container">
      <h2 className="h2title">Templates</h2>

      <div className="h2title">These are the most commonly downloaded templates</div>
    </div>
  );
};

export default Header;
