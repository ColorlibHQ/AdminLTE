/*----------Ristrict Only Number Input Validation Start---------------------------------------*/
$(document).ready(function() {
  if($("#billNoInput").length)
  setInputFilter(document.getElementById("billNoInput"), function(value) {
	  return value;
  });
  if($("#crNoInput").length)
  setInputFilter(document.getElementById("crNoInput"), function(value) {
	  return value;
  });
  if($("#sampleNoInput").length)
  setInputFilter(document.getElementById("sampleNoInput"), function(value) {
	  return value;
	  });
  if($("#labNoInput").length)
  setInputFilter(document.getElementById("labNoInput"), function(value) {
	  return value;
	  });
});

function setInputFilter(textbox, inputFilter) {
  ["input","keypress","keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
    	  var intValue="";
    	  this.value.split("").forEach(function(item){
    		 if(item!="" && item!=" " && !isNaN(item) ){
    			 intValue+=item;
    		 }
    	  });
    	  if(intValue.length>0){
    		  intValue=inputFilter(intValue);
    		  this.value = intValue;
    		  this.oldValue = intValue;
    	  }else{
    		  if (this.hasOwnProperty("oldValue") && this.value!="") { this.value = this.oldValue; }
    		  else{ this.value =""; this.oldValue="";}
    	  }
    });
  });
}


$("#textA").bind('copy', function() {
    $(".spanCopyAlert").text('copy behaviour detected!')
});
$("#textA").bind('paste', function() {
    $(".spanCopyAlert").text('paste behaviour detected!')
});
$("#textA").bind('cut', function() {
    $(".spanCopyAlert").text('cut behaviour detected!')
});
/*----------Increased shadow on hover-----------------------------*/
$(document).ready(function() {
  $('.hover-shadow').hover(
    function() {
      $(this).addClass("shadow-lg");
    },
    function() {
      $(this).removeClass("shadow-lg");
    }
  );
});


/*----------Expand and collapse all DataTable rows on button click Starts---------*/
function expandColapseRow(booleanExpand, table) {
  if (booleanExpand == true) {
    // Expand row details
    table.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
    //Switch buttons
    $('table .expandButton').addClass("d-none");
    $('table .collapseButton').removeClass("d-none");
  } else {
    // Collapse row details
    table.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
    //Switch buttons
    $('table .collapseButton').addClass('d-none');
    $('table .expandButton').removeClass('d-none');
  }
}

/*----------select DataTable all row's checkBoxes  on thead checkBox Starts---------*/
function sellectAllDtCheck(booleanCheck, table){
	if (booleanCheck == true) {
		table.rows().select();
		$('.rowCheckBoxes').prop("checked", true);
		//table.rows().$(tr td:nth-child(2) input).prop("checked", true);
	}
	else {
		table.rows().deselect();
		$('.rowCheckBoxes').prop("checked", false);
	}
}
/*----------------------------------------------------------------------------------*/


