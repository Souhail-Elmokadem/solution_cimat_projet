import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMandatComponent } from './list-mandat/list-mandat.component';
import { MandateFormComponent } from './mandate-form/mandate-form.component';
import { HomeComponent } from './home/home.component';
import { ListChauffeurComponent } from './list-chauffeur/list-chauffeur.component';
import { EditMandatComponent } from './edit-mandat/edit-mandat.component';

const routes: Routes = [
  { path: 'list', component: ListMandatComponent },
  { path: 'mandat', component: MandateFormComponent },
  {path: 'mandat/:id',component:EditMandatComponent},
  { path: 'chauffeur', component: ListChauffeurComponent },
  { path: '', component: HomeComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
