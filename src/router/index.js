import HomeComponent from "../public/pages/home.component.vue";
import {createRouter, createWebHistory} from "vue-router";
//import {authenticationGuard} from "../iam/services/authentication.guard.js";
//import SignUpComponent from "../iam/pages/sign-up.component.vue";
//import SignInComponent from "../iam/pages/sign-in.component.vue";


//const AboutComponent = () => import('../public/pages/about.component.vue');
//const CategoryManagementComponent = () => import('../publishing/pages/category-management.component.vue');
//const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');


const routes = [
    {path: '/home', name: 'home', component: HomeComponent, meta: {title: 'Home'}},
    {path: '/about', name: 'about', component: AboutComponent, meta: {title: 'About'}},
    {
        path: '/publishing/categories',
        name: 'categories',
        component: CategoryManagementComponent,
        meta: {title: 'Categories'}
    },
    {path: '/sign-in', name: 'sign-in', component: SignInComponent, meta: {title: 'Sign-In'}},
    {path: '/sign-up', name: 'sign-up', component: SignUpComponent, meta: {title: 'Sign-Up'}},
    {path: '/', name: 'default', redirect: '/home'},
    {path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFoundComponent, meta: {title: 'Page Not Found'}}
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    let baseTitle = 'Vitaly project';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});


export default router;