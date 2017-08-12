import {Component, ComponentRef, ContentChildren, ElementRef, forwardRef, QueryList, ViewChildren} from "@angular/core";
import {NgCarouselItemComponent} from "./NgCarouselItemComponent";
let Carousel=require("nativescript-carousel").Carousel;
let CarouselItem=require("nativescript-carousel").CarouselItem;
import {isAndroid} from "platform"
import {TouchGestureEventData} from "tns-core-modules/ui/gestures";

@Component({
    selector:"ns-carousel",
    template:"",
    inputs:["autoPagingInterval","showIndicator","height","indicatorColor","indicatorColorUnselected","indicatorRadius","indicatorPadding","indicatorOffset"]
})
export class NgCarouselComponent{
    @ContentChildren(forwardRef(() => NgCarouselItemComponent)) items: QueryList<NgCarouselItemComponent>;
    parent;
    autoPagingInterval=0;
    showIndicator=true;
    height=400;
    indicatorColor="yellow";
    indicatorColorUnselected="#eee";
    finite=false;
    indicatorRadius=5;
    indicatorPadding=5;
    indicatorOffset="0,0";

    androidInterval;
    androidIntervalFlag:boolean;
    constructor(private comp:ElementRef){
        //comp.nativeElement
    }
    ngAfterViewInit(){
        console.log("init start");
        //alert("init start");
        this.parent=this.comp.nativeElement.parent;
        this.setUp();
        this.items.changes.subscribe(val=>{
            this.setUp();
        });
    }
    setUp(){

        let carousel=new Carousel();
        carousel.height=this.height;
        carousel.indicatorColor=this.indicatorColor;
        carousel.finite=this.finite;
        carousel.autoPagingInterval=this.autoPagingInterval;
        //carousel["indicatorColorUnselected"]=this.indicatorColorUnselected;
        carousel["indicatorRadius"]=this.indicatorRadius;
        carousel["indicatorPadding"]=this.indicatorPadding;
        carousel["indicatorColorUnselected"]=this.indicatorColorUnselected;
        carousel["indicatorOffset"]=this.indicatorOffset;

        //alert("change start");
        this.parent.removeChildren();
        this.items.forEach(comp=>{
            let cItem=new CarouselItem();
            let _parent=comp.element.parent;
            if(_parent!=null){
                _parent.removeChild(comp.element);
            }
            cItem.addChild(comp.element);
            carousel.addChild(cItem);

        });
        if(this.androidInterval) clearInterval(this.androidInterval);
        if(isAndroid && this.autoPagingInterval>0){
            this.androidInterval=setInterval(()=>{
                if(!this.androidInterval) return;
                if(carousel.selectedPage==this.items.length-1){
                    if(!this.finite){
                        carousel.selectedPage=0;
                    }else{
                        if(this.androidInterval) clearInterval(this.androidInterval);
                    }
                }else{
                //alert(carousel["selectedPage"]);
                    carousel["selectedPage"]+=1;
                }
            },this.autoPagingInterval);
            carousel["on"]("touch",(e:TouchGestureEventData)=>{
                switch (e.action){
                    case "down":
                        this.androidIntervalFlag=false;
                        break;
                    case "up":
                    case "cancel":
                        this.androidIntervalFlag=true;
                        break;
                }
            });
            carousel["on"]("unloaded",e=>{
                carousel["off"]("touch");
                if(this.androidInterval) clearInterval(this.androidInterval);
            })
        }
        this.parent.addChild(carousel);
    }
}