import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// DEMO PAGES

// Dashboards




const routes: Routes = [
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
