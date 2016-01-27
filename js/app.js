miniQuery.ready( function() {
  window.onhashchange = getPersonBadges;
});

function reRenderBadges(response) {
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
      "points": allBadges[i].points,
      "badge_id": allBadges[i].id
    };
    var theCompiledHtml = theTemplate(context);
    $.select('.container')[0].innerHTML += theCompiledHtml;
  }

  // show the add badge thing and nav
  var theTemplateScript = $.select("#badge-add-template").innerHTML;
  var theTemplate = Handlebars.compile(theTemplateScript);
  var context={
    "name": JSON.parse(response).name,
    "user_id": JSON.parse(response).id
  };
  var theCompiledHtml = theTemplate(context);
  $.select('.container')[0].innerHTML += theCompiledHtml;
};

var addBadge = function() {
  form = document.forms["add_badge"];
  badge_content = form.elements["content"].value;
  person_id = form.elements["user_id"].value;
  $.ajax({
   url: 'http://localhost:3000/badges/new',
   type: 'POST',
   data: "badge=" + badge_content + "&person_id=" + person_id
  }).then(function(response) {
    reRenderBadges(response);
  }).catch(function(error) {
    console.log(error);
  });
  return false;
};

var getPersonBadges = function() {
  miniQuery.ajax({
   url: 'http://localhost:3000/badges',
   type: 'POST',
   data: "person=" + location.hash
  }).then(function(response) {
    reRenderBadges(response);
  }).catch(function(error) {
    console.log(error);
  });
}
