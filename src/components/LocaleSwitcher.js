import React from 'react';
import { Link } from 'react-router';

const LocaleSwitcher = () => (
  <ul>
    <li>
      <Link to="/en">EN</Link>
    </li>
    <li>
      <Link to="/fr">FR</Link>
    </li>
  </ul>
);

export default LocaleSwitcher;
