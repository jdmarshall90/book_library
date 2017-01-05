/* Hidden */
function view(x) {
  var targetId, targetElement;
  targetId = x;

  if (document.getElementById){
	     targetElement = document.getElementById(targetId);
  }else if(document.all){
  	 targetElement = document.all[targetId];
  }else if(document.layers){
  	targetElement = document[targetId];
  }
   if (targetElement.style.display == "none") {
        targetElement.style.display = "block";
		} else {
        targetElement.style.display = "none";
     }
}