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
    private userService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((isAuthenticated) => {
      if (isAuthenticated === this.condition) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  @Input() set showAuthed(condition: boolean) {
    this.condition = condition;
  }
}
