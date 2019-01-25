import React from 'react';
import fodec from './fodec.png';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <img src={fodec} />
    <Link to="/">Home</Link>

    <nav>
      <Link to="/helloworld">Hello World</Link>
    </nav>

    <hr />
  </header>
);

export default Header;
