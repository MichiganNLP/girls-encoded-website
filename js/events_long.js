$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: window.location.href + "/../data/events.csv",
        dataType: "text",
        success: function(data) {processEvents(data,pageCategory);}
    });
});

//TEMPLATE:
//<div class="row">
//    <div class="col-sm-6">
//        <div class="panel panel-default">
//        <div class="panel-heading">
//        <h3 class="panel-title">CS KickStart</h3>
//        </div>
//        <div class="panel-body">
//        <img id="events-left-image" src="images/cskickstart.png" alt="CS Kickstart Logo">
//         Description
//        </div>
//        </div>
//    </div>
//
//    <div class="col-sm-6">
//        <div class="panel panel-default">
//        <div class="panel-heading">
//        <h3 class="panel-title">GEECS</h3>
//        </div>
//        <div class="panel-body">
//        <img id="events-left-image" src="images/geecs.png" alt="gEECS Logo">
//         Description
//        </div>
//        </div>
//    </div>
//</div>
function processEvents(allText,pageCategory) {
    arrData = parseCsv(allText);
    
    var added_one = 0;
	var added_two = 0;
	var added_three = 0;
    var entry_one = "";
	var entry_two = "";
	var entry_three = "";
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var event = {title:data[0], description:data[1], image:data[2], image_alt:data[3], category:data[4], block:data[5]};

        var allCats = event.category.split(',');
        var found = 0;
        //Is the document category in this array?
        for(var j=0; j<allCats.length; j++) {
            if(allCats[j][0]==' ') {
                allCats[j] = allCats[j].substr(1);
            }
            if(pageCategory==allCats[j]) {
                found = 1;
                break;
            }
        }
        if(found==1) {
			if(event.block == "CURRENT") {
				if(added_one % 2 == 0) {
					if(added_one != 0) {
						entry_one = entry_one + '</div>'; //end row
					}
					entry_one = entry_one + '<div class="row">'; //start row
				}
			
				entry_one = entry_one + '<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + event.title + '</h3></div><div class="panel-body">'
				if(event.image) {
					entry_one = entry_one + '<img id="events-left-image" src="'+window.location.href+'/../images/' + event.image + '" alt="' + event.image_alt + '">';
				}
				entry_one = entry_one + event.description + '</div></div></div>';
				
				added_one = added_one + 1;
			} else if(event.block == "PAST") {
				if(added_two % 2 == 0) {
					if(added_two != 0) {
						entry_two = entry_two + '</div>'; //end row
					}
					entry_two = entry_two + '<div class="row">'; //start row
				}
			
				entry_two = entry_two + '<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + event.title + '</h3></div><div class="panel-body">'
				if(event.image) {
					entry_two = entry_two + '<img id="events-left-image" src="'+window.location.href+'/../images/' + event.image + '" alt="' + event.image_alt + '">';
				}
				entry_two = entry_two + event.description + '</div></div></div>';
				
				added_two = added_two + 1;
			} else { //event.block == "AFFILIATED"
				if(added_three % 2 == 0) {
					if(added_three != 0) {
						entry_three = entry_three + '</div>'; //end row
					}
					entry_three = entry_three + '<div class="row">'; //start row
				}
			
				entry_three = entry_three + '<div class="col-sm-6"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + event.title + '</h3></div><div class="panel-body">'
				if(event.image) {
					entry_three = entry_three + '<img id="events-left-image" src="'+window.location.href+'/../images/' + event.image + '" alt="' + event.image_alt + '">';
				}
				entry_three = entry_three + event.description + '</div></div></div>';
				
				added_three = added_three + 1;
			}
        }
    }
    
    entry_one = entry_one + '</div>'; //end row
    $('#event_panels_one').append(entry_one);
	
    entry_two = entry_two + '</div>'; //end row
    $('#event_panels_two').append(entry_two);
    
	entry_three = entry_three + '</div>'; //end row
    $('#event_panels_three').append(entry_three);
}
