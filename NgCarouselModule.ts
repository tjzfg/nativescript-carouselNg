import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NgCarouselComponent} from "./NgCarouselComponent";
import {NgCarouselItemComponent} from "./NgCarouselItemComponent";

@NgModule({
    declarations:[NgCarouselComponent,NgCarouselItemComponent],
    exports:[NgCarouselComponent,NgCarouselItemComponent],
    schemas:[NO_ERRORS_SCHEMA]
})
export class NgCarouselModule{

}