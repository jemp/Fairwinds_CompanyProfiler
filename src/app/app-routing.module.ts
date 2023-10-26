import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { customersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: '', component: customersComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
