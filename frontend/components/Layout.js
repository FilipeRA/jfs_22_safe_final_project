import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="content">
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default Layout;
