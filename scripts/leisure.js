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
  console.log("in init function");
 $('#bookList').empty();
  $('#bookList').html('<h3>Here are '+ howMany + ' random books:</h3>'); 
  appendText("more text");
  testWrite();
});
  
function testWrite(){
  $('#bookListTest').text('text changed in function');
  $('#bookListTest').click(function(){
      console.log("item clicked");
     $("#bookListTest").text("text changed on click");
   });
}

function appendText($msg){
  $('#bookList').append($msg);
}



//testWrite();


}(jQuery));