import type { ParentProps } from "solid-js";

type NavLinkProps = {
  href: string;
  underlined?: boolean;
};

type Link = {
  title: string;
  href: string;
};

type NavbarProps = {
  links: Link[];
  current: string;
};

export function NavLink(props: ParentProps<NavLinkProps>) {
  return (
    <a
      href={props.href}
      target={props.href.startsWith("http") ? "_blank" : "_self"}
      class={`inline-block ${
        props.underlined
          ? "underline decoration-themeColor text-themeColor underline-offset-4 transition-colors"
          : "text-white decoration-none"
      }`}
    >
      {props.children}
    </a>
  );
}

export function Navbar(props: ParentProps<NavbarProps>) {
  return (
    <header class="pb-2 text-center">
      <div class="flex flex-row justify-center gap-2">
        {props.links.map((link) => {
          const isExternal = link.href.startsWith("http");
          const isUnderlined = isExternal || link.href === props.current;
          return (
            <NavLink href={link.href} underlined={isUnderlined}>
              {link.title}
            </NavLink>
          );
        })}
      </div>
    </header>
  );
}
