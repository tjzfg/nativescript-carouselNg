import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NgCarouselComponent} from "./NgCarouselComponent";
import {NgCarouselItemComponent} from "./NgCarouselItemComponent";
import {NgCarouselImagesComponent} from "./NgCarouselImagesComponent";
import {CommonModule} from "@angular/common";

@NgModule({
    imports:[CommonModule],
    declarations:[NgCarouselComponent,NgCarouselItemComponent,NgCarouselImagesComponent],
    exports:[NgCarouselComponent,NgCarouselItemComponent,NgCarouselImagesComponent],
    schemas:[NO_ERRORS_SCHEMA]
})
export class NgCarouselModule{

}