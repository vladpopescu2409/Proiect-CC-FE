// Se foloseste pentru a ascunde sau a afisa diferite componente in functie de rolul utilizatorilor logati


import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  // In momentul adaugarii la o componenta html se specifica rolul necesar pentru vizualizare. Acesta este transmis in aceasta directiva, aceasta directiva apeleaza functia hasRole() din auth.service.ts, iar functia din auth.service.ts verifica daca rolul utilizatorului logat la momentul respectiv coincide cu rolul necesar(transmis din html prin aceasta directiva) pentru vizualizarea componentei.

  @Input() set appHasRole(role: string) {
    if (this.authService.hasRole(role)) {
      //show content
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      //hide content
      this.viewContainerRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authService: AuthService) { }

}
