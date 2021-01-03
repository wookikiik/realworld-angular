import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../core/guards/auth.guard';
import { EditorComponent } from './editor.component';

const routes: Routes = [
  { path: '', component: EditorComponent, canActivate: [AuthGuardGuard] },
  { path: ':slug', component: EditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
