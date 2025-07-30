import LoginComponent from "../IAM/pages/login.component.vue";
import RegisterComponent from "../IAM/pages/register.component.vue";
import {createRouter, createWebHistory} from "vue-router";
//import {authenticationGuard} from "../iam/services/authentication.guard.js";
//import SignUpComponent from "../iam/pages/sign-up.component.vue";
//import SignInComponent from "../iam/pages/sign-in.component.vue";


//const AboutComponent = () => import('../public/pages/about.component.vue');
//const CategoryManagementComponent = () => import('../publishing/pages/category-management.component.vue');
const PageHomeComponent = () => import("../public/pages/page-home.component.vue")
const SubscriptionPlanManagerComponent = () => import("../SPM/pages/subscription-plan-management.component.vue")
const PaymentManagementComponent = () => import("../SPM/pages/payment-management.component.vue");
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');

const routes = [
    {path: '/login', name: 'login', component: LoginComponent, meta: {title: 'Login'}},
    {path: '/home', name: 'home', component: PageHomeComponent, meta: {title: 'Home'}},
    {path: '/subscriptions/payment-management', name: 'PaymentManagement', component: PaymentManagementComponent, meta: {title: 'Payment Management'}},
    {path: '/register', name: 'register', component: RegisterComponent, meta: {title: 'Register'}},
    {path: '/subscriptions', name: 'subscriptions-plan-management', component: SubscriptionPlanManagerComponent, meta: {title: 'Subscription Plan Manager'}},
    {path: '/', name: 'default', redirect: '/login'},
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