import React from 'react';
import CollaboratoryLogo from './Collaboratory';
import DataDotOrg from './DataDotOrg';

const Header = () => {
  return (
    <header className="flex">
      <span className="w-[65px]"></span>

      <a href="#" className="flex justify-center align-middle items-center">
        <CollaboratoryLogo width={379 / 3} />
      </a>
      <a
        href="https://data.org"
        className="justify-center align-middle items-center mx-8 hidden lg:flex"
      >
        <DataDotOrg width={150 / 2} />
      </a>
      <span className="flex-grow"></span>
      <span className="flex justify-center align-middle items-center">
        <a
          href="https://www.who.int/initiatives/collaboratory"
          className="sm:hidden inline-block align-middle"
        >
          About
        </a>
        <a
          href="https://www.who.int/initiatives/collaboratory"
          className="hidden sm:inline-block align-middle"
        >
          About Collaboratory
        </a>
        <a
          href="https://collaboratory.who.int/forum/"
          className="button hidden sm:inline ml-4"
        >
          Join Collaboratory
        </a>
        <a
          href="https://collaboratory.who.int/forum/"
          className="sm:hidden button ml-4"
        >
          Join
        </a>
      </span>
    </header>
  );
};

export default Header;
