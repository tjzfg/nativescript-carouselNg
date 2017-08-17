import {Component, ComponentRef, ContentChildren, ElementRef, forwardRef, QueryList, ViewChildren} from "@angular/core";
import {NgCarouselItemComponent} from "./NgCarouselItemComponent";
let Carousel=require("nativescript-carousel").Carousel;
let CarouselItem=require("nativescript-carousel").CarouselItem;
import {isAndroid} from "platform"
import {TouchGestureEventData} from "tns-core-modules/ui/gestures";

@Component({
    selector:"ns-carousel",
    template:"",
    inputs:["autoPagingInterval","showIndicator","height","indicatorColor","indicatorColorUnselected","indicatorRadius",
        "indicatorPadding","indicatorOffset","selectedPage","pageChanged"]
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
    pageChanged=()=>{};
    androidInterval;
    androidIntervalFlag:boolean;
    get selectedPage():number{
        return this._selectedPage;
    }
    set selectedPage(selectedPage:number){
        this._selectedPage=selectedPage;
        this.carousel.selectedPage=selectedPage;
    }
    _selectedPage=0;
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
    carousel=new Carousel();
    setUp(){
        // this.carousel=new Carousel();
        this.carousel.showIndicator=this.showIndicator;
        this.carousel.height=this.height;
        this.carousel.indicatorColor=this.indicatorColor;
        this.carousel.finite=this.finite;
        this.carousel.autoPagingInterval=this.autoPagingInterval;
        //carousel["indicatorColorUnselected"]=this.indicatorColorUnselected;
        this.carousel["indicatorRadius"]=this.indicatorRadius;
        this.carousel["indicatorPadding"]=this.indicatorPadding;
        this.carousel["indicatorColorUnselected"]=this.indicatorColorUnselected;
        this.carousel["indicatorOffset"]=this.indicatorOffset;
        //alert("change start");
        this.parent.removeChildren();
        this.items.forEach(comp=>{
            let cItem=new CarouselItem();
            let _parent=comp.element.parent;
            if(_parent!=null){
                _parent.removeChild(comp.element);
            }
            cItem.addChild(comp.element);
            this.carousel.addChild(cItem);

        });
        if(this.androidInterval) clearInterval(this.androidInterval);
        if(isAndroid && this.autoPagingInterval>0){
            this.androidInterval=setInterval(()=>{
                if(!this.androidInterval) return;
                if(this.carousel.selectedPage==this.items.length-1){
                    if(!this.finite){
                        this.carousel.selectedPage=0;
                    }else{
                        if(this.androidInterval) clearInterval(this.androidInterval);
                    }
                }else{
                    //alert(carousel["selectedPage"]);
                    this.carousel["selectedPage"]+=1;
                }
            },this.autoPagingInterval);
            this.carousel["on"]("touch",(e:TouchGestureEventData)=>{
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
            this.carousel["on"]("unloaded",e=>{
                this.carousel["off"]("touch");
                if(this.androidInterval) clearInterval(this.androidInterval);
            })
        }
        this.parent.addChild(this.carousel);
        this.carousel["on"]("pageChanged",this.pageChanged);
        this.carousel["selectedPage"]=this.selectedPage;
    }
}