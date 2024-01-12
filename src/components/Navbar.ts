import NavbarComponent from "./Navbar.astro";
import Link from "./Link.astro";

const Navbar = Object.assign(NavbarComponent, { Link });

export { Navbar }