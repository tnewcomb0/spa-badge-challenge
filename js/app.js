miniQuery.ready( function() {
  window.onhashchange = getPersonBadges;
});

var getPersonBadges = function() {
  miniQuery.ajax({
   url: 'http://localhost:3000/badges',
   type: 'POST',
   data: location.hash
  }).then(function(response) {
    // show the header
    var theTemplateScript = $.select("#header-template").innerHTML;
    var theTemplate = Handlebars.compile(theTemplateScript);
    var context={
      "name": JSON.parse(response).name
    };
    var theCompiledHtml = theTemplate(context);
    $.select('.container')[0].innerHTML = theCompiledHtml;

    // show all the badges
    var allBadges = JSON.parse(response).badges
    for(var i = 0; i < allBadges.length; i++) {
      var theTemplateScript = $.select("#badge-template").innerHTML;
      var theTemplate = Handlebars.compile(theTemplateScript);
      var context={
        "index": i + 1,
        "title": allBadges[i].title,
        "points": allBadges[i].points
      };
      var theCompiledHtml = theTemplate(context);
      $.select('.container')[0].innerHTML += theCompiledHtml;
    }

    // show the add badge thing and nav
    var theTemplateScript = $.select("#badge-add-template").innerHTML;
    var theTemplate = Handlebars.compile(theTemplateScript);
    var context={
      "name": JSON.parse(response).name
    };
    var theCompiledHtml = theTemplate(context);
    $.select('.container')[0].innerHTML += theCompiledHtml;
  }).catch(function(error) {
    console.log(error);
  });
}
