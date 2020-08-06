import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
    selector: '[appHasRole]' //*appHasRole
})
export class HasRoleDirective implements OnInit {
    @Input() appHasRole: string[];
    //appHasRole =  ['Admin', 'Moderator'];
    isVisible = false;
    constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, private authService: AuthService) { }
    ngOnInit(): void {
        const userRoles = this.authService.decodedToken.role as Array<string>;
        //if user has no roles, the element to which this directive is attached should not be displayed
        if(!userRoles){
            this.viewContainerRef.clear();
        }

        //if user has a particular role need them render the element
        if(this.authService.roleMatch(this.appHasRole)){
            if(!this.isVisible)
            this.isVisible = true;
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else{
            this.isVisible = false;
            this.viewContainerRef.clear();
        }
    }
}