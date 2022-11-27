import React from 'react';
import Link from 'next/link';
import { Footer } from 'flowbite-react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Footerr = () => (
  // <footer className="footer-container">

  //   {/* <span className="footer--links-left">
  //     © Copyright 2022 SAFE. All Rights Reserved.
  //   </span>

  //   <ul className="footer--links-right">
  //     <li>
  //       {' '}
  //       <Link href="https://github.com/FilipeRA/jfs_22_safe_final_project">Github</Link>
  //     </li>
  //     <li>
  //       <Link href="https://www.salt.dev/sv-SE">Salt JFS Fall 2022</Link>
  //     </li>
  //   </ul> */}
  //   <Footer.Copyright
  //     href="#"
  //     by="Flowbite™"
  //     year={2022} />
  //   <Footer.LinkGroup>
  //     <Footer.Link href="#">
  //       About
  //     </Footer.Link>
  //     <Footer.Link href="#">
  //       Privacy Policy
  //     </Footer.Link>
  //     <Footer.Link href="#">
  //       Licensing
  //     </Footer.Link>
  //     <Footer.Link href="#">
  //       Contact
  //     </Footer.Link>
  //   </Footer.LinkGroup>

  // </footer>
  <Footer container className="footer-container">
    <Footer.Copyright
      href="#"
      by="Copyright 2022 SAFE. All Rights Reserved."
      year={2022} />
    <Footer.LinkGroup>
      <Footer.Link href="https://github.com/FilipeRA/jfs_22_safe_final_project">
        <Image src="/GitHub-Mark-120px-plus.png" alt="" width={30} height={30} />
      </Footer.Link>
      <Footer.Link href="#">
        Privacy Policy
      </Footer.Link>
      <Footer.Link href="#">
        Licensing
      </Footer.Link>
      <Footer.Link href="#">
        Contact
      </Footer.Link>
    </Footer.LinkGroup>
  </Footer>

);

export default Footerr;
