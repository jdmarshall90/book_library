var filterTimeout = null; /* global timeout filter */

/* Code to enable the lightbox
   Thanks to Conor for adding code to print out the image height/width */
function initializeColorbox(cbWidth) {
	$(".cb").colorbox({
		maxHeight: "95%",
		scrolling: true,
		width:cbWidth
	});
}

function initializeFilter() {
	/* Bind onkeypress to the search box - auto filter the table as things get typed in
	   include it on a delay so that the JavaScript doesn't overwhelm browsers */
	$("#filter").keyup(function() {
		if (filterTimeout != null) { clearTimeout(filterTimeout); }
		filterTimeout = setTimeout(searchFilter, 400);
	});
}

function searchFilter() {
	/* clear the timeout before we can get to business */
	filterTimeout = null;

	/* Show every row if the search field is mostly empty */
	if ( $("#filter").val().length < 3 ) {
		$("#emptyresults").hide();
		$("#filter").css("background-color", "white");
		$("#sortable").show();
		$("#sortable tbody tr").css("display", "");
		viscount = $("#sortable tbody tr").length;
		
		/* restore the ability to shrink/grow the table */
		$("#sortable").css("min-width", "");
		$("#sortable").css("width", "");
	}

	/* show rows that match, hide rows that don't */
	else {
	
		/* prevent the table from shrinking and growing horizontally */
		$("#sortable").css("min-width", $("#sortable").css("width"));
		$("#sortable").css("width", $("#sortable").css("width"));
		
		/* now, let's start hiding and showing */
		viscount = 0;
		searchString = $("#filter").val().toLowerCase(); /* optimize out repeated val and toLowerCase */
		
		$("#sortable tbody tr").each( function() {
			if ( (this.textContent || this.innerText || "").toLowerCase().indexOf( searchString ) === -1 ) {
				this.style.display = "none";
			}
			else {
				this.style.display = "";
				viscount += 1;
			}
		});
		
		/* if there's more than one tr that's visible, show the table */
		if (viscount > 0) {
			$("#emptyresults").hide();
			$("#filter").css("background-color", "white");
			$("#sortable").show();	
		}			

		/* show the no results found div and hide the table, if there are no results */
		if ( viscount === 0) {
			$("#sortable").hide();
			$("#filter").css("background-color", "pink");
			$("#emptyresults").show();
		}
		
	}
	
	$("#sortable tbody tr:visible:even").removeClass("even odd").addClass("even");
	$("#sortable tbody tr:visible:odd").removeClass("even odd").addClass("odd");	

	/* update the entry count */
	$("#globalTotalEntries").text(viscount);
}

function initializeTablesorterParsers() {
	/* This code creates a tablesorter parser that ignores "The " at the beginning of a title */
	$.tablesorter.addParser({ 
		// set a unique id (titles) 
		id: 'titles',
		
		is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
		}, 
		
		format: function(s) { 
			// remove any instances of "The" and "A " at the beginning of a string
			s = s.toLowerCase();
			if (s.substr(0,4) === "the ") { return s.substr(4); }
			else if (s.substr(0,3) === "an ") { return s.substr(3); }
			else if (s.substr(0,2) === "a ") { return s.substr(2); }
			else { return s; }
		}, 
		
		// titles are text type (not numeric)
		type: 'text' 
	});
	
	/* This code creates a tablesorter parser that sorts by how "adult" (aka awesome) a movie is */
	$.tablesorter.addParser({ 
		// set a unique id (titles) 
		id: 'movieratings',
		
		is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
		}, 
		
		format: function(s) {	
			// turn the ratings into a numeric value
			switch (s.toLowerCase().replace('-', '')) {
				case "g": return(0); // mpaa
				case "a": return(0); // mexico
				case "u": return(0); // uk
				case "pg": return(10); // mpaa
				case "pg12": return(15); // japan
				case "12": return(15); // uk, germany
				case "12a": return(15); // uk
				case "b": return(15); // mexico
				case "pg13": return(20); // mpaa
				case "r15": return(25); // japan
				case "15": return(25); // uk
				case "b15": return(25); // mexico
				case "16": return(27); // ireland?, germany
				case "r": return(30); // mpaa
				case "r18": return(30); // japan
				case "18": return(30); // uk, germany
				case "c": return(30); // mexico
				case "nc17": return(40); // mpaa
				case "x": return(40); // mpaa?  what a great letter
				case "nr": return(50); // not rated
				default: return(60); // everything else
			}
		}, 
		
		// titles are text type (not numeric)
		type: 'numeric' 
	});	
	
	/* Numeric sorting for myRating. Just following Marumari's lead here, no idea what I am actually doing. */
	$.tablesorter.addParser({ 
		// set a unique id (titles) 
		id: 'myRating',
		
		is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
		}, 
			
		format: function(s) {
			// Value of s is <img src="Images/darkstar8.png" alt="Rating" />
			s = s.substr(25);
			return parseInt(s);
		},
		type: 'numeric' 
	});	
}
