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

    class slideToUnlock {
        constructor(el, options){
            this.$el = el;
            this.$drag;
            this.start = false;
            this.leftEdge;
            this.rightEdge;
            this.status = false;
            this.mouseX ;

            this.settings = {
                text    : "Slide To Unlock",
                useData : false,
                unlock: function(){console.log("unlock")},
                lock  : function(){},
                allowLocking : true
            }

            // Establish our default settings
            this.settings =  Object.assign(this.settings, options);	
            if(this.settings.useData){
                this.settings.text = this.$el.data("unlock-text");
            }

            this.init();
            return this;
        };

        init() {
            this.$el.addClass('slideToUnlock');
            this.leftEdge  = this.$el.offset().left;
            this.rightEdge = this.leftEdge + this.$el.outerWidth();
            
            this.$el.text(this.settings.text);
            this.$el.append("<div class='progressBar'></div>");
            this.$el.append("<div class='drag'>  </div>");
            
            this.$drag = this.$el.find('.drag');
            this.$progressBar = this.$el.find(".progressBar");
            
            this.$el.on("mousedown touchstart",  this.touchStart.bind(this));          
        }

        touchStart(event = window.event){  
            this.start = true;
            $(document).on("mousemove touchmove",  this.touchMove.bind(this));
            $(document).on("mouseup touchend",     this.touchEnd.bind(this));
            this.mouseX = (event.type == 'mousedown' )? event.pageX : event.originalEvent.touches[0].pageX;
          
            event.preventDefault();
        }

        touchMove(event = window.event){ 
            if(!this.start) return;               
                var X = (event.type == 'mousemove' )? event.pageX : event.originalEvent.touches[0].pageX;
                var changeX = ( X - this.mouseX );
                var edge = this.$drag.offset().left + ( X - this.mouseX );
                this.mouseX = X;
                if(edge < this.leftEdge){
                    this.touchEnd();
                    this.settings.lock();
                    this.start = false;
                    this.status = false;                    
                    return;
                }

                if(edge > this.rightEdge - this.$drag.outerWidth()){
                    this.touchEnd();
                    this.settings.unlock();
                    this.status = true;
                    this.start = false;                    
                    return;
                }

                this.$drag.offset({left : edge });           
                this.$progressBar.css({"width": edge - this.$el.offset().left + this.$drag.outerWidth() });

                event.stopImmediatePropagation();
        }

        touchEnd(event = window.event){  
            this.start = false;
            this.mouseX = 0;           
            if(!this.status){
                this.$drag.animate({left : 0 });
                this.$progressBar.animate({width : this.$drag.width()}, function(){
                    this.$progressBar.css({width:0 });                                     
                }.bind(this));
            }
            if(this.status){
                this.$drag.animate({left: this.$el.outerWidth() - this.$drag.outerWidth() });
                this.$progressBar.animate({"width": this.$el.outerWidth() });
            }
            $(document).off("mousemove touchmove");
            $(document).off("mouseup touchend");
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    /*
    * Add it to Jquery
    */
    (function ( $ , window) {
        $.fn.extend({
            slideToUnlock: function(options) {
                $.each(this, function(i, el) {
                    var $el = $(el);
                    $el.data(new slideToUnlock($el, options));
                });
            }
        });
    }( jQuery, window ));

