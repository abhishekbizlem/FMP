import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const router: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: '',
    component: SignInComponent,
    // children: [
    //   { path: 'sign-in', component: SignInComponent },   
    //   { path: 'sign-up', component: SignUpComponent },       
    // ]
  },
  { path: '**', component: SignInComponent },
  
];
@NgModule({
  imports: [RouterModule.forRoot(router)],
})
export class CrmRoutingModule { }

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
