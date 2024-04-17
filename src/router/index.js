import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Login from '@/components/Login.vue';
import UnauthorizedAccess from '@/components/UnauthorizedAccess.vue';
import axios from 'axios';
import { extractUserData, hasScopes } from '../util/util';
import { useConfigStore } from '../store/config';
import Application from '../components/Application.vue';
import Collab from '../components/Collab.vue';
import SupervisorHome from '../components/SupervisorHome.vue';
import Questions from '../components/Questions.vue';
import Requests from '../components/Requests.vue';
import AddFeedback from '../components/AddFeedback.vue';
import TransferPage from '../components/TransferPage.vue';
import Admin from '../components/Admin.vue';
import NewUser from '../components/NewUser.vue';
import SecondRead from '../components/SecondRead.vue'

//import Answers from '../components/Answers.vue';



const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: [
        { path: '/', component: HelloWorld},
        { path: '/unauthorized', component: UnauthorizedAccess },
        {   path: '/login', 
            component: Login,
            async beforeEnter(to, from, next) {
                
                 if (hasScopes('read:supervisor')) {
                    next('/supervisorHome');
                } else if (hasScopes('read:student')) {
                    const config = useConfigStore();
                    const url = `${config.config.backend_url}/verify`;
                    try {  
                    const response = await axios.get(url, {
                      headers: {
                        authorization: `Bearer ${config.accessToken}`,
                      },
                    });
                    console.log(response);
                    if (response.status == 200) {
                        if(response.data.found) {
                            next('/application');
                        } else {
                            next('/newUser');
                        }
                    } else {
                        console.log("unexpected status code")
                    }
                      
                    } catch(e) {
                      console.error("failed to get Project status from user");
                      console.log(e);
                    }
                    
                
                } else if (hasScopes('read:admin')) {
                    next('/admin');
                } else {
                    next('/unauthorized');
                }
            }

            
        },
        { path: '/newUser', component: NewUser},
        { path: '/admin', component: Admin},
        { path: '/application', component: Application},
        { path: '/collab/:id', component: Collab},
        { path: '/supervisorHome', component: SupervisorHome},
        { path: '/backHome', component: TransferPage,
            beforeEnter(to, from, next) {
                if (hasScopes('read:student')) {
                    next('/application');
                } else if (hasScopes('read:supervisor')) {
                    next('/supervisorHome');
                } else {
                    next('/unauthorized');
                }
            }
        },
        { path: '/questions', component: Questions},
        { path: '/requests', component: Requests},
        { path: '/secondRead', component: SecondRead},
        { path: '/collab/:id/feedback/:feedbackId', component: AddFeedback},
        //{ path: '/answers', component: Answers},
        {
             path: '/callback', 
             component: Login,
             async beforeEnter(to, from, next) {
                console.log('processing callback')
                if(to.query.state === localStorage.state){
                    console.log(to.query.state)
                    if(to.query.code && to.query.code !== ''){
                        console.log(to.query.code)
                        try {
                            const config = useConfigStore();
                            const payload = {
                                code: to.query.code,
                            }
                            const response = await axios.post(`${config.config.backend_url}/authorize`, payload, {
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            });
                            let n = null;
                            console.log(localStorage.nextRoute);
                            console.log(payload);
                            if (localStorage.nextRoute) {
                                n = JSON.parse(localStorage.nextRoute);
                            }

                            config.storeTokens(response.data);

                            //await delay(1000);
                            localStorage.removeItem('nextRoute');
                            localStorage.removeItem('state');
                            localStorage.idToken = response.        data.id_token;
                            localStorage.accessToken = response.data.access_token;
                            localStorage.refreshToken = response.data.refresh_token;
                            localStorage.tokenExpiresAt = Date.now() + response.data.expires_in * 1000;
                            const claims = await extractUserData(localStorage.accessToken);
                            if (claims.payload.scope && claims.payload.scope !== '') {
                                config.setScope(claims.payload.scope);
                            }
                            console.log(n);
                            next(n);
                        } catch (e) {
                            console.log(e);
                            next("/");
                        }
                        
            
            
                    }
                } 
                next();
             }
        },
        {
            path: '/logout', 
            component: Login,
            async beforeEnter(to, from, next) {
               console.log('processing callback')
               localStorage.removeItem('idToken');
               localStorage.removeItem('accessToken');
               localStorage.removeItem('refreshToken');
               localStorage.removeItem('tokenExpiresAt');
               next("/");
               
            }
       }
      ], // short for `routes: routes`
  });


 router.beforeEach(async (to, from, next) => {
     console.log(to.path);
     if(to.path !== '/callback' && to.path !== '/logout' && to.path !== '/' && to.path !== '/unauthorized' && to.path != '/questions'){
         const now = new Date().getTime();
         if ((localStorage.accessToken && +localStorage.tokenExpiresAt > now)) {
             console.log("Using stored credentials")
             const config = useConfigStore();
             config.storeTokens({
                 access_token: localStorage.accessToken, 
                 id_token: localStorage.idToken, 
                 refresh_token: localStorage.refreshToken, 
                 expires_in: +localStorage.tokenExpiresAt
             });
             const claims = await extractUserData(localStorage.accessToken);
             if (claims.payload.scope && claims.payload.scope !== '') {
                 config.setScope(claims.payload.scope);
             }
             next();
             return;
         } else {
         //     if (localStorage.refreshToken && localStorage.refreshToken !== '') {
         //         console.log(config);
         //         try {
         //             const payload = {
         //                 refresh_token: localStorage.refreshToken,
         //             }
         //             const response = await axios.post(`${config.config.backend_url}/authorize`, payload, {
         //                 headers: {
         //                     'Content-Type': 'application/json',
         //                 }
         //             });

         //             config.storeTokens(response.data);
         //             localStorage.idToken = response.data.id_token;
         //             localStorage.accessToken = response.data.access_token;
         //             localStorage.refreshToken = response.data.refresh_token;
         //             localStorage.tokenExpiresAt = Date.now() + response.data.expires_in * 1000;
         //             const claims = await extractUserData(localStorage.accessToken);
         //             if (claims.payload.scope && claims.payload.scope !== '') {
         //                 config.setScope(claims.payload.scope);
         //             }
         //             next();
         //         } catch (e) {
         //             console.log(e);
         //             next("/");
         //         }
         //     } else {
         // }
             const config = useConfigStore();
             localStorage.state = Math.random().toString(36).substring(7);
             localStorage.nextRoute = JSON.stringify(to);
             location.href = `${config.config.authorise_url}?response_type=code&client_id=${config.config.client_id}&redirect_uri=${config.config.callback}&scope=${config.config.application_scopes}&audience=${config.config.audience}&state=${localStorage.state}`;
             next(false)
             return 
     }
     }
     next();
})


export default router;