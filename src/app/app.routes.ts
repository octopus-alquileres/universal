// libs
import { MetaGuard } from '@ngx-meta/core';

// app
import { ChangeLanguageComponent } from '~/app/framework/i18n';

// module
import { LoginComponent } from './login/login.component';
import { MainComponent } from './layout/main.component';

export const routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'PUBLIC.LOGIN.PAGE_TITLE'
      }
    }
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: './+home/home.module#HomeModule'
      },
      {
        path: 'about',
        loadChildren: './+about/about.module#AboutModule'
      },
      {
        path: 'air-universal',
        loadChildren: './+air-universal/air-universal.module#AirUniversalModule'
      },
      {
        path: 'secure-page',
        loadChildren: './+secure/secure.module#SecureModule'
      }
    ],
    canActivateChild: [MetaGuard],
    data: {
      i18n: {
        isRoot: true
      }
    }
  },
  {
    path: 'change-language/:languageCode',
    component: ChangeLanguageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
