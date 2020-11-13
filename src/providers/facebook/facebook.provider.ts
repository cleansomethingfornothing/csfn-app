declare const FB: any;
declare global {
    interface Window {
        fbAsyncInit: Function;
    }
}

class FacebookProvider {

    public initWeb() {
        console.log('Init facebook')
        window.fbAsyncInit = function () {
            FB.init({
                appId: '328579138196679',
                cookie: true,
                xfbml: true,
                version: 'v5.0'
            });
        };

        (function (d, s, id) {
            if (d.getElementById(id)) return;
            const fjs = d.getElementsByTagName(s)[0];
            const js = d.createElement(s);
            js.id = id;
            (js as HTMLScriptElement).src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

}

export const facebookProvider = new FacebookProvider()
