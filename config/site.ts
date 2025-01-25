export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Manage Paisa",
  description: "",
  apiURL: "https://paisa.somee.com/api/",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/frontio-ai/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
  firebaseConfig: {
    apiKey: "AIzaSyBq_0iZBJ1XDCIsuCahd8yaOE8uusV2yEw",
    authDomain: "managepaisa-9e97b.firebaseapp.com",
    projectId: "managepaisa-9e97b",
    storageBucket: "managepaisa-9e97b.appspot.com",
    messagingSenderId: "857816856822",
    appId: "1:857816856822:web:3dfe6a62662f47c5ea94d7",
  },
};
