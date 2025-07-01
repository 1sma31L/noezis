import { Icon } from "@iconify/react";
import Link from "next/link";
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
    label: "GitHub",
    icon: <Icon icon="mdi:github" width="16" height="16" />,
  },
  {
    href: "https://x.com/noezis",
    label: "X",
    icon: (
      <Icon
        icon="streamline-logos:x-twitter-logo-solid"
        width="16"
        height="16"
      />
    ),
  },
  {
    href: "https://www.instagram.com/noezis",
    label: "Instagram",
    icon: <Icon icon="mdi:instagram" width="16" height="16" />,
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
