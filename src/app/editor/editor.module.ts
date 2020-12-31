import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardGuard, SharedModule } from '../shared';
import { EditableResolver } from './editable-article.resolver';
import { EditorComponent } from './editor.component';

const editorRouting: ModuleWithProviders<RouterModule> = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuardGuard],
    resolve: {
      article: EditableResolver,
    },
  },
]);

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, editorRouting],
  providers: [EditableResolver],
})
export class EditorModule {}
