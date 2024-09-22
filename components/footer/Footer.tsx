import React from 'react';
import { socials, links } from './footerData';

const Footer = () => {
  return (
    <footer className="bg-black mt-44 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-col md:justify-between md:flex-row w-full mb-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">stofli/ui</h2>
            <p className="mt-2 text-gray-600 dark:text-zinc-400">Building the future of decentralized applications.</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-10 items-start">
            <ul className="mt-2 text-sm space-y-2">
              {links.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-600 dark:text-zinc-400 dark:hover:text-zinc-300">{item.name}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4">
              {socials.map((item, index) => (
                <a href={item.href} key={index} className="flex p-1">
                  <item.icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-400/20 w-full mt-4 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} stofli/ui. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
