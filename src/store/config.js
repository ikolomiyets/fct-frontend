import { defineStore } from 'pinia';


export const useConfigStore = defineStore('config', {
    state: () => {
        return {
            idToken: null,
            accessToken: null,
            refreshToken: null,
            tokenExpiresAt: null,
            config: {
                authorise_url: 'https://dev-d4tf4m1mg470mn4s.us.auth0.com/authorize',
                client_id: 'GKFXtfXQ2sU7b8bsW8KHg424RjwtOU4S', 
                callback: 'http://localhost:5173/callback',
                application_scopes: 'openid%20profile%20offline_access%20read:questions%20read:student%20read:supervisor%20read:admin',
                audience: 'https://fct-api.com',
                backend_url: 'http://localhost:3000',
                logout_url: 'https://dev-d4tf4m1mg470mn4s.us.auth0.com/oidc/logout'
            },
            scopes: [],
        }
    },
    actions: {
        storeTokens({access_token, id_token, refresh_token, expires_in}){
            this.accessToken = access_token;
            this.idToken = id_token;
            this.refreshToken = refresh_token;
            this.tokenExpiresAt = Date.now() + expires_in * 1000;
            ;
        },
        setScope(scope) {
            console.log(scope);
            this.scopes = scope.split(' ');
        },
        logout(){
            this.accessToken = null;
            this.idToken = null;
            this.refreshToken = null;
            this.tokenExpiresAt = null;
            location.href = `${configStore.logout_url}?returnTo=http://localhost:5173/`
        }
    },
    getters: {

    }
});