import Link from "next/link";
import { RiGithubLine, RiInstagramLine, RiTwitterXFill } from "react-icons/ri";
import React from "react";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const socialLinks = [
  {
    href: "https://github.com/noezis",
    icon: <RiGithubLine className="mr-2 h-4 w-4" />,
  },
  {
    href: "https://x.com/noezis",
    icon: <RiTwitterXFill className="mr-2 h-4 w-4" />,
  },
  {
    href: "https://www.instagram.com/noezis",
    icon: <RiInstagramLine className="mr-2 h-4 w-4" />,
  },
];

function Footer() {
  return (
    <footer className="flex min-h-24 flex-col items-center justify-center gap-2 px-10 py-4 lg:gap-6">
      <ul className="text-muted-foreground flex h-full w-full items-center justify-center gap-4 text-sm">
        {links.map((link, index) => (
          <li
            key={index}
            className="hover:text-foreground transition-colors duration-300"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <ul className="text-muted-foreground flex h-full w-full items-center justify-center gap-4 text-sm">
        {socialLinks.map((link, index) => (
          <li
            key={index}
            className="hover:text-foreground flex flex-row items-center gap-2 transition-colors duration-300"
          >
            <Link href={link.href}>{link.icon}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
