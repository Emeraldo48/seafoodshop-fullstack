export const getCookie = (name: string) => {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const removeCookie = (name: string) => document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

export const setCookie = (name: string, value: string) => document.cookie = name + "=" + value + "; path=/";
