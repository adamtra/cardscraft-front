import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './layouts/navigation/navigation.component';
import { BlankComponent } from './layouts/blank/blank.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'manu',
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/navigation/navigation.module').then(m => m.NavigationModule)
      }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/blank/blank.module').then(m => m.BlankModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'manu'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
