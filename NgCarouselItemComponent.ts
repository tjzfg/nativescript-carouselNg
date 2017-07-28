import {Component, ElementRef} from "@angular/core";

@Component({
    selector:"ns-carousel-item",
    template:"<ng-content></ng-content>"
})
export class NgCarouselItemComponent{
    element;
    constructor(element:ElementRef){
        this.element=element.nativeElement;
    }
}