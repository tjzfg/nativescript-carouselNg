import {Component, ComponentRef, ContentChildren, ElementRef, forwardRef, QueryList, ViewChildren} from "@angular/core";
import {NgCarouselItemComponent} from "./NgCarouselItemComponent";
import {Carousel, CarouselItem} from "nativescript-carousel";
import {isAndroid} from "platform"
import {TouchGestureEventData} from "tns-core-modules/ui/gestures";

@Component({
    selector:"ns-carousel",
    template:"",
    inputs:["autoPagingInterval","showIndicator","height","indicatorColor"]
})
export class NgCarouselComponent{
    @ContentChildren(forwardRef(() => NgCarouselItemComponent)) items: QueryList<NgCarouselItemComponent>;
    parent;
    autoPagingInterval=0;
    showIndicator=true;
    height=400;
    indicatorColor="yellow";
    finite=false;

    androidInterval;
    androidIntervalFlag:boolean;
    constructor(private comp:ElementRef){
        //comp.nativeElement
    }
    ngAfterViewInit(){
        console.log("init start");
        alert("init start");
        this.parent=this.comp.nativeElement.parent;
        this.setUp();
        this.items.changes.subscribe(val=>{
            this.setUp();
        });
    }
    setUp(){

        let carousel:Carousel=new Carousel();
        carousel.height=this.height;
        carousel.indicatorColor=this.indicatorColor;
        carousel["finite"]=this.finite;
        carousel["autoPagingInterval"]=this.autoPagingInterval;
        alert("change start");
        this.parent.removeChildren();
        this.items.forEach(comp=>{
            let cItem:CarouselItem=new CarouselItem();
            let _parent=comp.element.parent;
            if(_parent!=null){
                _parent.removeChild(comp.element);
            }
            cItem.addChild(comp.element);
            carousel.addChild(cItem);

        });
        if(this.androidInterval) clearInterval(this.androidInterval);
        if(isAndroid){
            this.androidInterval=setInterval(()=>{
                if(!this.androidIntervalFlag) return;
                if(carousel["selectedPage"]==this.items.length-1){
                    if(!this.finite){
                        carousel["selectedPage"]=0;
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