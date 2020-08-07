import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular'
import { ActionBarComponent } from './ui/action-bar/action-bar.component';

@NgModule({
    imports: [NativeScriptCommonModule, NativeScriptRouterModule],
    declarations: [ActionBarComponent],
    exports: [ActionBarComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule {

}