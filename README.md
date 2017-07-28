1. install dependencies
    ``` 
    npm install nativescript-carousel
    npm install tjzfg/nativescript-carouselNg --save
    ```  
2. create index.d.ts in node_modules/nativescript-carousel
    ```
    export class Carousel{
        addChild(view);
        height;
        showIndicator;
        autoPagingInterval;
        indicatorColor;
    }
    export class CarouselItem{
        addChild(view);
    }
    ```
3. enjoy it with directives "ns-carousel" and "ns-carousel-item"

## Thanks for all contributors of nativescript plugin nativescript-carousel 