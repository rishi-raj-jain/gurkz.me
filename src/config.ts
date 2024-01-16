type SocialAccount = {
  platform: string;
  username: string;
  link?: string;
};

export const SITE_TITLE = "gurkan -";
export const SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    platform: "twitter",
    link: "https://twitter.com/@thatgurkangurk",
    username: "@thatgurkangurk",
  },
  {
    platform: "github",
    link: "https://github.com/thatgurkangurk",
    username: "@thatgurkangurk",
  },
  {
    platform: "reddit",
    link: "https://reddit.com/u/thatgurkangurk",
    username: "u/thatgurkangurk",
  },
  {
    platform: "discord",
    username: "@thatgurkangurk",
  },
];
