import React from "react";

function Footer() {
  return (
    <footer className="small-footer p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Meta
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Jobs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Help
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Api
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privicy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Terms
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Instagram lite
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              threads
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Meta Verified
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <a href="#" className="hover:underline">
            © 2024 Instagram from Meta
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
