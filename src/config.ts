type SocialAccount = {
    platform: string
} & {
    username: string
} | {
    link: string
}

export const SITE_TITLE = "gurkan -";
export const SOCIAL_ACCOUNTS: SocialAccount[] = [
    {
        platform: "twitter",
        link: "https://twitter.com/@thatgurkangurk"
    },
    {
        platform: "github",
        link: "https://github.com/thatgurkangurk"
    },
    {
        platform: "reddit",
        link: "https://reddit.com/u/thatgurkangurk"
    },
    {
        platform: "discord",
        username: "@thatgurkangurk"
    }
]