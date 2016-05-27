(function ($) {

// work with smaller file for now
var debug=false;
var dataFile;
if (debug)
  dataFile = 'leisureBooks-sample.json';
else
  dataFile = 'leisureBooks.json';
var howMany = 10;
var descriptions = []; // for an array of bookDesc objects;

console.log("in file");


$(init=function(){
  $("#bookList").click(function () {
    $("#bookList").text("functions changed");
    console.log("in click function");
  });
});
  


// don't add duplicate numbers to the array
$(checkIfInArray=function(arr, item){
  var flag = false;
  for (var i = 0; i < arr.length; i++){
    if (arr[i]==item){
      flag = true;
      break;
    }
  }
  return flag;
});

$(generateRandomNumbers=function(howMany, numBooks){
    var debug=false;
          if (debug) numBooks = 5; // force more duplicates
    var numArr= new Array; //make sure to try with just 1
    var randomNum;
    var flag;
    for (var i=0; i<howMany; i++){
      flag=true;
      while (flag==true){
        randomNum=Math.floor(Math.random()*(numBooks));
        flag = checkIfInArray(numArr, randomNum);
        if (flag ==false){
          numArr[i]=randomNum;
        }
      }
    }
    if (debug) alert(JSON.stringify(numArr));
    return numArr;
});

$(findDesc=function(idToFind){
  for (var i in descriptions){
    if (descriptions[i].id===idToFind){
      return descriptions[i].summary;
    }
    else {
      continue;
    }
  }
});       

  // Use event delegation    
$(changeDesc=function(e) {
  console.log( e.target.id + " clicked" );
  var thisDesc;
  thisDesc=findDesc(e.target.id);
  jQuery('#text'+e.target.id).html(thisDesc);
});


$(loadRandomBooks=function(){
    var truncLen = 150;
    var bookSummaryTxt;
    descriptions = [];

    jQuery.getJSON(dataFile, function(json) {
        jQuery('#bookList tbody').empty();
        jQuery('#headingLine').html('Here are '+ howMany + ' random books');
        var numBooks = json.leisureBooks.length;
        Books = json.leisureBooks;
        var numArr=generateRandomNumbers(howMany, numBooks);
          for (var i=0; i<numArr.length; i++){
            var bookDesc = {};
            var thisBook=Books[numArr[i]];
            var bookURL = 'https://vufind.carli.illinois.edu/vf-iit/Search/Home?lookfor=' + thisBook.isbn + '&type=all&start_over=1&submit=Find&search=new';
            if (!thisBook.title) // unlikely, but handle anyway
                thisBook.author="[untitled]";
            if (!thisBook.author)
                thisBook.author="(no author supplied)";
            if (!thisBook.summary)
                bookSummaryTxt = "No description available.";
            else
                bookSummaryTxt = thisBook.summary;

            var row = '<tr id=\"row'+i+'\">';
            row += '<td class=\"title\">' + thisBook.title +'</td>';
            row += '<td>' + thisBook.author + '</td>';

            // handle summary
            if (bookSummaryTxt.length > truncLen) {
              bookSummaryTxt = bookSummaryTxt.substring(0,truncLen) + "..."; 
             var moreLinkID = 'MoreLink'+i.toString();
             bookDesc.id = moreLinkID;
             bookDesc.summary = thisBook.summary;
             if (debug) console.log('LOOP i = ' + i + ' ' +JSON.stringify(bookDesc));
             descriptions.push(bookDesc);
              row += '<td id=\"text'+moreLinkID+'\" class=\'desc\'>' + bookSummaryTxt + ' <a id=\'' + moreLinkID + '\' class=\"descLink\">more</a>' + '</td>'; // create more link
            }
            
            else {          
              row += '<td class=\'desc\'>' + bookSummaryTxt + '</td>';
            }  

            row += '<td><p class=\"button\"><a target=\"_blank\"href=\"'+ bookURL +'\">Checked out?</a></p></td>';
            row += '</tr>';
            
            jQuery('#bookList').append(row); 

      }// end for

      if (debug){
        for ( var ele in descriptions){         
           console.log('ele: '+ ele + ' item: '+ JSON.stringify(descriptions[ele])+'\n');
        }
      }
      
    });// end getJSON

});
// end loadRandomBooks
init();
}(jQuery));