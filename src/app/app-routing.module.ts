import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'coverpage',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'coverpage',
    loadChildren: () => import('./pages/coverpage/coverpage.module').then( m => m.CoverpagePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'reserves',
    loadChildren: () => import('./pages/reserves/reserves.module').then( m => m.ReservesPageModule)
  },
  {
    path: 'dishes',
    loadChildren: () => import('./pages/dishes/dishes.module').then( m => m.DishesPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then( m => m.ShoppingCartPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'allergens',
    loadChildren: () => import('./pages/allergens/allergens.module').then( m => m.AllergensPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
