// Angular modules
import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { Routes }                   from '@angular/router';
import { RouterModule }             from '@angular/router';
import { HttpClientModule }         from '@angular/common/http';

// Librairies externes
import { NgFlashMessagesModule }    from 'ng-flash-messages';                       // flas messages

// Services
import { AuthService }              from './services/auth.service';
import { AppareilService }          from './services/appareil.service';
import { AuthGuard }                from './services/auth-guard.service';

// Components
import { AppComponent }             from './app.component';
import { MenuComponent }            from './menu/menu.component';
import { AuthComponent }            from './auth/auth.component';
import { AppareilsComponent }       from './appareils/appareils.component';
import { AppareilsViewComponent }   from './appareils-view/appareils-view.component';
import { AppareilsListComponent }   from './appareils/appareils-list/appareils-list.component';
import { SingleAppareilComponent }  from './appareils/single-appareil/single-appareil.component';
import { ForOhforComponent }        from './for-ohfor/for-ohfor.component';
import { ProfileComponent }         from './profile/profile.component';
import { FooterComponent }          from './footer/footer.component';
import { AppareilsFormComponent }   from './appareils/appareils-form/appareils-form.component';

const appRoutes: Routes = [
    { path: 'authentification'      ,                                   component: AuthComponent },
    { path: 'add-new-machine'       , canActivate: [AuthGuard],         component: AppareilsFormComponent },
    { path: 'update-machine/:id'    , canActivate: [AuthGuard],         component: AppareilsFormComponent },
    { path: 'machines-list'         , canActivate: [AuthGuard],         component: AppareilsViewComponent },
    { path: 'machines-list/:id'     , canActivate: [AuthGuard],         component: SingleAppareilComponent },
    { path: 'profile'               , canActivate: [AuthGuard],         component: ProfileComponent },
    { path: 'not-found'             ,                                   component: ForOhforComponent },
    { path: ':id'                   , canActivate: [AuthGuard],         component: SingleAppareilComponent },
    { path: ''                      , redirectTo: 'authentification',   pathMatch: 'full' },  // si beug rajout pathMatch: 'full'
    { path: '**'                    , redirectTo: 'not-found' }
];


@NgModule({
  declarations: [
    AppComponent,
    AppareilsComponent,
    AppareilsViewComponent,
    AppareilsListComponent,
    SingleAppareilComponent,
    MenuComponent,
    AuthComponent,
    ForOhforComponent,
    ProfileComponent,
    FooterComponent,
    AppareilsFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgFlashMessagesModule.forRoot()
  ],
  providers: [
    AppareilService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
