export default function parseUserAgent(ua) {
    let userAgent = ua.toLowerCase();

    let platform = /windows nt 10.0/.test(userAgent) ? 'Windows 10 或者更高' :
                   /windows nt 6.2/.test(userAgent) ? 'Windows 8' :
                   /windows nt 6.1/.test(userAgent) ? 'Windows 7' :
                   /mac os x 10[\._\d]+/.test(userAgent) ? 'macOS' :
                   /android/.test(userAgent) ? 'Android' :
                   /iphone|ipad|ipod/.test(userAgent) ? 'iOS' :
                   /linux/.test(userAgent) ? 'Linux' : 'Unknown';

    let browser = /msie|trident/.test(userAgent) ? 'Internet Explorer' :
                  /edg/.test(userAgent) ? 'Edge' :
                  /chrome/.test(userAgent) ? 'Chrome' :
                  /safari/.test(userAgent) ? 'Safari' :
                  /firefox/.test(userAgent) ? 'Firefox' :
                  /opera/.test(userAgent) ? 'Opera' : 'Unknown';

    let match = /(edg|chrome|safari|firefox|opera|msie|trident(?=\/))\/?\s*(\d+)/i.exec(userAgent);
    let version = match ? match[2] : 'Unknown';

    return { platform, browser, version };
}