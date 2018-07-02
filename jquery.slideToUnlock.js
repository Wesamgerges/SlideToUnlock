  /**
   * @license
   * Copyright 2018 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   */

(function ( $ ) {
 
    var base = this;
    var el;
    var drag;
    var start = false;
    var leftEdge;
    var rightEdge;
    var status = false;
    var mouseX ;

    var settings = {
        text    : "Slide To Unlock",
        unlock  : function(){console.log("unlock")},
        lock    : function(){},
        allowLocking : true
    }

    $.fn.slideToUnlock = function(options) {
        el = $(this);
        
        // Establish our default settings
        settings = $.extend(settings, options);
        console.log(settings)
        base._init();

        return this;
    };

    base._init = function(){
        console.log(el)
        el.addClass('slideToUnlock');
        leftEdge  = el.offset().left;
        rightEdge = leftEdge + el.outerWidth();
        console.log(leftEdge, rightEdge)
        el.text(settings.text);
        el.append("<div class='progressBar'></div>");
        el.append("<div class='drag'>  </div>");
        // el.append("<div id='d3'>dddd</div>");
        drag = el.find('.drag');
        drag.on("mousedown touchstart",  base._touchStart);
        drag.on("mousemove touchmove",  base._touchMove);
        drag.on("mouseup mouseout touchend",     base._touchEnd);
    }

    base._touchStart = function(event){  
        start = true;
        console.log("mouse start", start)         
        var e = event || window.event;
        mouseX = (e.type == 'mousedown' )? e.pageX : e.originalEvent.touches[0].pageX;
        console.log("start",mouseX);
        e.preventDefault();
    }

    base._touchMove = function(event){       
        if(!start) return;               
            var e = event || window.event;
            
            var X = (e.type == 'mousemove' )? e.pageX : e.originalEvent.touches[0].pageX;
            var changeX = ( X - mouseX );
            var edge = drag.offset().left + ( X - mouseX );
            mouseX = X;
            if(edge < leftEdge){
                settings.lock();
                start = false;
                status = false;
                return;
            }
            if(edge > rightEdge){
                settings.unlock();
                status = true;
                start = false;
                return;
            }
               
            drag.offset({left:edge });
            var progressBar = el.find(".progressBar");
            progressBar.css({"width": changeX + progressBar.width() });
            console.log(edge)
            e.preventDefault();
    }

    base._touchEnd = function(event){  
        start = false;
        mouseX = 0;
        console.log("mouse end")         
            var e = event || window.event;
            var X = (e.type !== 'touchsend' )? e.clientX : e.originalEvent.touches[0].clientX;
            console.log("end",X);
            if(!status){
                drag.animate({left:0 });
                el.find(".progressBar").animate({"width": 0 });
            }
            if(status){
                drag.animate({left:el.outerWidth() });
                el.find(".progressBar").animate({"width": el.outerWidth() });
            }
            e.preventDefault();
    }

}( jQuery ));

