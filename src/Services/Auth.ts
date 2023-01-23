globalThis.user_id = localStorage.getItem('USERID')
globalThis.token = localStorage.getItem('TOKEN')

export class Auth {

    static Check = localStorage.getItem('TOKEN') ? true : false;
    static AuthRoute = 'Auth'
    
    static Logout(reload=true) {
        globalThis.user_id = '';
        globalThis.token = '';
        localStorage.removeItem('USERID');
        localStorage.removeItem('TOKEN');
        if(reload) window.location.href = '/';
        return;
    }
    
}