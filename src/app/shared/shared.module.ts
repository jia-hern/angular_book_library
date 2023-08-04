import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceHolderDirective } from "./directives/placeholder.directive";
import { DropdownDirective } from "./directives/dropdown.directive";


@NgModule({
    declarations:[AlertComponent, LoadingSpinnerComponent, PlaceHolderDirective, DropdownDirective],
    imports: [CommonModule],
    exports:[CommonModule,AlertComponent,LoadingSpinnerComponent,PlaceHolderDirective,DropdownDirective],
})
export class SharedModule{}