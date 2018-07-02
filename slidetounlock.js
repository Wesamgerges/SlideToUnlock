$(document).ready(function(){
    // return;
    $('#drag').draggable({
        axis: "x",
        containment: "parent",
        revert: "invalid" ,
        cursor: "move",
        // refreshPositions: true,
        stop:function(event, ui){
            console.log(ui)
        },
        revert: function(event, ui){
            console.log("revert from event")
        },
        drag:function(event,ui){
            $(".progress").css({"width": ui.position.left});
            // console.log(($("#container").width() - ui.position.left - 45),  ui.position.left );
            // console.log( $("#container:after").css("width"));
            // $("#container").after().css("width", ui.position.left+"px")
            // $("#container").css("background", "-webkit-linear-gradient(left, green "+ ui.position.left+"px, white "+ ($("#container").width() - ui.position.left - 45)+"px)");
        }
      });


    $( "#end" ).droppable({
        // accept: "#drag",  
        drop: function( event, ui ) {
            // alert("droped")
            console.log("dropped", $("#container").width() - $("#drag").width(),$("#container").css("width"));
            $("#drag").animate({"left":  $("#container").width() - $("#drag").width() + "px"}).html("<<");
            // $("#drag").draggable('option', 'revert', false)
        }
    });

    $("#start").droppable({  
        drop: function( event, ui ) {
        // alert("droped")
            console.log("dropped");
            $("#drag").animate({'left': 0}).html(">>");
            
            // $("#drag").draggable('option', 'revert', false)
        }
    });
    // $("#drap").css('left', "-50px")

});