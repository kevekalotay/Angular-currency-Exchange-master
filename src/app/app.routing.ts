import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyComponent } from './currency/currency.component';
import { CryptoComponent } from './crypto/crypto.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';



const appRoutes: Routes = [

  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'currency',
    component: CurrencyComponent
  },
  {
    path: 'crypto',
    component: CryptoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
