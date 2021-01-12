import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Directive({
  selector: '[showAuthed]',
})
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  @Input('showAuthed') condition: boolean;

  ngOnInit(): void {
    console.log('directive...');
    this.userService.isAuthenticated //
      .subscribe((isAuthenticated) => {
        console.log(isAuthenticated);
        if (isAuthenticated === this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }
}
