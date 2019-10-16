import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from 'src/app/pages/main-menu/main-menu.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
  },
  {
    path: 'settings',
    loadChildren: () => import('../../pages/settings/settings.module').then(m => m.SettingsModule),
  },
  {
    path: 'deck',
    loadChildren: () => import('../../pages/deck/deck.module').then(m => m.DeckModule),
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('../../pages/admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
