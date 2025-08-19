import LoginComponent from "../IAM/pages/login.component.vue";
import RegisterComponent from "../IAM/pages/register.component.vue";
import {createRouter, createWebHistory} from "vue-router";

const SettingsComponent = () => import('../public/pages/settings.component.vue');
const PageHomeComponent = () => import("../public/pages/home.component.vue");
const ProfileComponent = () => import("../public/pages/profile.component.vue");
const ProfileSetupComponent = () => import("../P&&P/pages/setup-profile.component.vue");
const SubscriptionPlanManagerComponent = () => import("../SPM/pages/subscription-plan-management.component.vue")
const PageNotFoundComponent = () => import('../public/pages/not-found.component.vue');

const routes = [
    {path: '/login', name: 'login', component: LoginComponent, meta: {title: 'Login'}},
    {path: '/home', name: 'home', component: PageHomeComponent, meta: {title: 'Home'}},
    {path: '/settings', name: 'settings', component: SettingsComponent, meta: {title: 'Settings'}},
    {path: '/register', name: 'register', component: RegisterComponent, meta: {title: 'Register'}},
    {path: '/setup-profile', name: 'setup-profile', component: ProfileSetupComponent, meta: {title: 'Setup Profile'}},
    {path: '/profile', name: 'profile', component: ProfileComponent, meta: { requiresAuth: true, title: 'Profile' }},
    {path: '/subscriptions', name: 'subscription-plan-management', component: SubscriptionPlanManagerComponent, meta: {title: 'Subscription Plan Manager'}},
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