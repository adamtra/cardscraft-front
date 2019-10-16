import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingViewComponent } from './setting-view/setting-view.component';


const routes: Routes = [
  {
    path: '',
    component: SettingViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
