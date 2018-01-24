//API call for NYT////////////////////////////////////////////
var userInput
var LinktoArticle
var articleCounter = 0;
var NytHeader
var WsjHeader
var BbHeader
var nYT_articleImage
var nyt_snipit
var NytData // nyt Respo
var wSjData // WSJ repo holder
var bB_Data // BB Repo holder
var WSJ_articleImage
var bB_articleImage
var section4_ArticleLocation ="leftSide" // current div the image is clicked on left side or right side
// section4_ArticleLocation will be used below in an if else


// the below var is to make the next click on the title to be appended to the left/right section based on what was clicked first
var currentSelectedArticle=""


function reachNYTapi() {

  userInput = $("#searchBar").val().trim();
  if (userInput) {
    // If search item is Nan this will not let the user click submit

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=9bbd8167715c47cf98ffd217a669c995&sort=newest&q=" + userInput;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(NYTresponse) {
        // console.log(NYTresponse.response.docs);
        // console.log(NYTresponse)
        NytData = NYTresponse.response.docs;
        // console.log(NytData);

        // forloop that will display the 5 headers.
        $("#display-blue-article").empty();

        for (i = 0; i < 5; i++) {

          // article link for read more
          // console.log(nytArticleLink);
          var nytArticleLink = NYTresponse.response.docs[i].web_url;
          // console.log(nytArticleTitles);
          var nytArticleTitles = NYTresponse.response.docs[i].headline.main;

          // date and time //
          var publishedAt = NYTresponse.response.docs[i].pub_date

          // console.log(nYT_articleImage);

          articleCounter++;

          // maybe add a class on each list item and use on click function later on and say this.

          NytHeader = "<a onClick='displayNYTsection4(" + i + ")' href='#' ><li class='Nyt_article_list list-group-item'>" + nytArticleTitles + "</li></a>";

          $("#display-blue-article").append(NytHeader);

        };

      });
  }
}

// //API call for WSJ////////////////////////////////////

function reachWSJapi() {
  userInput = $("#searchBar").val().trim();
  if (userInput) {

    var queryURLWSJ = 'https://newsapi.org/v2/everything?' +
      'q=' + userInput + '&' +
      'sources=' + 'the-wall-street-journal' + '&' +
      'sortBy=publishedAt&' +
      'language=en&' +
      'apiKey=29a6e2a1dcf34cc9a4528d592d8b5ed8';


    $.ajax({
      url: queryURLWSJ,
      method: "GET"
    }).done(function(WSJresponse) {
      wSjData = WSJresponse.articles;
      // console.log(wSjData);
      // console.log(WSJresponse);
      // console.log(articles)
      if (WSJresponse.articles.length == 0) {
        alert(" display no article on the html for this section")
      } else {

        //to dynamically create article list
        $("#display-neutral-article").empty();

        for (i = 0; i < 5; i++) {
          var wsjArticleTitles = WSJresponse.articles[i].title;
          // console.log(wsjArticleTitles);

          var wsjArticleLink = WSJresponse.articles[i].url;

          articleCounter++;
          // maybe add a class on each list item and use on click function later on and say this.
          WsjHeader = "<a onClick='displayWSJsection4(" + i + ")' href='#' ><li class='Wsj_article_list list-group-item'>" + wsjArticleTitles + "</li></a>";





          $("#display-neutral-article").append(WsjHeader);

        }
      }

    })
  }
}
// // // ///////////////////////////////////////////////////////

// // // //API call for BB/////////////////////////////////////
function reachBBapi() {
  userInput = $("#searchBar").val().trim();

  var queryURLBreitbart = 'https://newsapi.org/v2/everything?' +
    'q=' + userInput + '&' +
    'sources=' + 'breitbart-news' + '&' +
    'sortBy=publishedAt&' +
    'language=en&' +
    'apiKey=29a6e2a1dcf34cc9a4528d592d8b5ed8';


  $.ajax({
    url: queryURLBreitbart,
    method: "GET"
  }).done(function(BBresponse) {

    // console.log(BBresponse);
    // console.log(BBresponse.articles);
  // //   // updating bB_Data to hold the repo
     bB_Data = BBresponse.articles;
    console.log(bB_Data);








    //to dynamically create article list
    $("#display-red-article").empty();

    for (i = 0; i < 5; i++) {
      var bbArticleTitles = BBresponse.articles[i].title;
      // console.log(bbArticleTitles);

      var bbArticleLink = BBresponse.articles[i].url;

      // var ArticleImage ="http://www.nytimes.com/"+NYTresponse.response.docs[i].multimedia.url;

      articleCounter++;
      // maybe add a class on each list item and use on click function later on and say this.

      BbHeader = "<a onClick='displayBBsection4(" + i + ")' href='#' ><li class='Bb_article_list list-group-item'>" + bbArticleTitles + "</li></a>";




      $("#display-red-article").append(BbHeader);


    }
  })

}

// //////////////////////////////////////////////////////


//when user clicks submit////////////////////////////
$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  reachNYTapi();
  reachWSJapi();
  reachBBapi();

});


$("#nytArticle").append(LinktoArticle);
$("#wsjArticle").append(LinktoArticle);
$("#breitbartArticle").append(LinktoArticle);


// on click event to trigger section 4

// when user clicks link show the link to section 4


// when user clicks this titleRed in section 3 - the related info for thay section will be poplated in section 4

//===========================********=======================Code to make section 4 interavtivr =====******************==================//
function displayNYTsection4(i) {


  // console.log(NYTresponse.response.docs);
  // my var called NytData holds the result/////////////////////
  // updating
  var nYT_articleImage = $("<img>");
  nYT_articleImage.attr('src', "http://www.nytimes.com/" + NytData[i].multimedia[i].url);

// where to place the articles in the after the user clicks on one after the other

  if((currentSelectedArticle=="nyt" && section4_ArticleLocation=="rightSide")|| section4_ArticleLocation=="leftSide"){

  $("#left_selected_article").html(NytData[i].snippet)
  $("#left_selected_image").html(nYT_articleImage);
  $("#left_selected_date").html(NytData[i].pub_date);
  section4_ArticleLocation="rightSide";
  // console.log("http://www.nytimes.com/" + NytData[i].multimedia[i].url);
  // console.log(NytData[i].pub_date);
  // console.log(NytData[i])
  // console.log(NytData[i].snippet)
}
// if the first condition is true then no need to run the second code
else if((currentSelectedArticle=="nyt" && section4_ArticleLocation=="leftSide")|| section4_ArticleLocation=="rightSide") {


    section4_ArticleLocation="leftSide";  // resetting it
    $("#right_selected_article").html(NytData[i].snippet)
    $("#right_selected_image").html(nYT_articleImage);
    $("#right_selected_date").html(NytData[i].pub_date);

}
currentSelectedArticle="nyt"  // resetting the value of currentSelectedArticle

};
// =======================================for WSJ===============================================
function displayWSJsection4(i) {
  console.log("WSJ HAS BEEN CLICKED - where to display div");

  // wSjData = WSJresponse.articles;
  // console.log(wSjData);
  // // console.log(WSJresponse.articles[i].urlToImage)
  // console.log(wSjData[i].urlToImage)
  //   console.log(WSJresponse.articles[i].description)
  //     console.log(WSJresponse.articles[i].publishedAt)

var WSJ_articleImage = $("<img>");
WSJ_articleImage.attr('src', wSjData[i].urlToImage);

if((currentSelectedArticle=="WSJ" && section4_ArticleLocation=="rightSide")|| section4_ArticleLocation=="leftSide"){

  section4_ArticleLocation="leftSide";  // resetting it
  $("#right_selected_article").html(wSjData[i].description)
  $("#right_selected_image").html(WSJ_articleImage);
  $("#right_selected_date").html(wSjData[i].publishedAt);

}


// if the first condition is true then no need to run the second code
else if((currentSelectedArticle=="WSJ" && section4_ArticleLocation=="leftSide")|| section4_ArticleLocation=="rightSide") {


    section4_ArticleLocation="leftSide";  // resetting it
    $("#right_selected_article").html(wSjData[i].description)
    $("#right_selected_image").html(WSJ_articleImage);
    $("#right_selected_date").html(wSjData[i].publishedAt);

}
currentSelectedArticle="WSJ"  // resetting the value of currentSelectedArticle

};
//=================================For BB===============================================

function displayBBsection4(i) {
  console.log("BB HAS BEEN CLICKED - where do we display this");

  console.log(bB_Data); // the whole response
  console.log(bB_Data[i].title)  // titile
  console.log(bB_Data[i].description) // description
  console.log(bB_Data[i].publishedAt) // publication
  console.log(bB_Data[i].urlToImage)  // url image
  console.log(bB_Data[i].url) // read more link




  var bB_articleImage = $("<img>");
  bB_articleImage.attr('src',bB_Data[i].urlToImage);

  if((currentSelectedArticle=="bb" && section4_ArticleLocation=="rightSide")|| section4_ArticleLocation=="leftSide"){

  section4_ArticleLocation="leftSide";  // resetting it
  $("#right_selected_article").html(bB_Data[i].description)
  $("#right_selected_image").html(bB_articleImage);
  $("#right_selected_date").html(bB_Data[i].publishedAt);

  }


  // if the first condition is true then no need to run the second code
  else if((currentSelectedArticle=="bb" && section4_ArticleLocation=="leftSide")|| section4_ArticleLocation=="rightSide") {


    section4_ArticleLocation="leftSide";  // resetting it
    $("#right_selected_article").html(bB_Data[i].description)
    $("#right_selected_image").html(bB_articleImage);
    $("#right_selected_date").html(bB_Data[i].publishedAt);

  }
  currentSelectedArticle="bb"  // resetting the value of currentSelectedArticle




};
