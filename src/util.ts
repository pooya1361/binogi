export const noImageUrl = 'https://usercontent.one/wp/www.vocaleurope.eu/wp-content/uploads/no-image.jpg?media=1642546813'
export const isNullOrUndefined = (value: any) => value === undefined || value === null
export const openLink = (media: "linkedIn" | "gitHub" | "twitter", accountName: string) => {
    if (!isNullOrUndefined(accountName)) {
        switch (media) {
            case "linkedIn":
                window.open("https://linkedin.com/" + accountName, "_blank")
                break;

            case "gitHub":
                window.open("https://github.com/" + accountName, "_blank")
                break;

            case "twitter":
                window.open("https://twitter.com/" + accountName, "_blank")
                break;

            default:
                break;
        }
    }
}