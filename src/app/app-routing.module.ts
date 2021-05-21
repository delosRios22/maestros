import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';

const routes: Routes = [
  {path: 'maestros', component: ReactiveComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'maestros'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
