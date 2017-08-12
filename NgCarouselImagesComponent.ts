import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {screen} from "platform";

@Component({
    selector:"ns-carousel-images",
    template:`<ns-carousel height="{{pageWidth*scale}}">
            <ns-carousel-item *ngFor="let image of images|async">
                <Image src="{{picUrl+image}}" decodeWidth="{{pageWidth}}" decodeHeight="{{pageWidth*scale}}"></Image>
            </ns-carousel-item>
        </ns-carousel>`,
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class NgCarouselImagesComponent{
    pageWidth=screen.mainScreen.widthDIPs;
    @Input() ratio=0.4;
    @Input() images;
    @Input() picUrl;
}