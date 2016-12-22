$(document).ready(function() {
    var pageCategory = $('meta[name=category]').attr("content");

    //Dynamically load recent news
     $.ajax({
        type: "GET",
        url: "data/recent_news.csv",
        dataType: "text",
        success: function(data) {processRecentNews(data,pageCategory);}
    });
});

//Template:
//<p class="recent-news-date">Sample date0</p>
//<p class="lead">This is a description of what's happening0 (see more <a href="">here</a>)</p>
function processRecentNews(allText,pageCategory) {
    arrData = parseCsv(allText);
    
    var appended = 0; //Only append the first four recent events
    var last = false;   
 
    for (var i=1; i<arrData.length; i++) {
        var data = arrData[i];
        
        var news = {date:data[0], description:data[1], link:data[2], category:data[3]};

        var allCats = news.category.split(',');
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
            var entry = '<p class="recent-news-date">' + news.date + '</p><p class="lead">' + news.description;
            if(news.link) {
                entry = entry + ' (<a href="' + news.link + '">link</a>)</p>';
            }
            entry = entry + '</p>';
        
            if(appended < 8) { //Only show the most recent entries on the home page
                $('#recent_news').append(entry);
                appended = appended + 1;
            }
        }

	//A little bit hack-y
	if(appended == 8 && !last) {
	    last = true;
    	    var pageCategory = $('meta[name=category]').attr("content");
    	    if(pageCategory == "LIT") {
                $('#recent_news').append('<p id="italics" class="lead">See more news <a href="news.html">here</a>.</p>');
            }
            if(pageCategory == "Girls Encoded") {
        	$('#recent_news').append('<p id="italics" class="lead">See more news <a href="events.html">here</a>.</p>');
    	    }
	}
    }
}
