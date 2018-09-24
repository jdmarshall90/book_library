$(document).ready(function() 
{
	initializeColorbox("960px");
	initializeFilter();
	initializeTablesorterParsers();

	/* Load the pedia-specific table sorter */
	$("#sortable").tablesorter({
	headers: {0: {sorter:'titles'}, 6: {sorter:'myRating'}},
	sortList: [[0,0]],
	sortForce: [[0,0]],
	widgets: ['zebra']
	});
});