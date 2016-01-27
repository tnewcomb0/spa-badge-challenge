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
}; // end reRenderBadges

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
}; // end addBadge

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
}; // end getPersonBadges

function addUpVote() {
  alert("1");
  form = document.forms["up_vote"];
  vote_type = "up";
  badge_id = form.elements["slogan_id"].value;
  alert("2");
  $.ajax({
   url: 'http://localhost:3000/badges/vote',
   type: 'POST',
   data: "badge_id=" + badge_id + "&vote_type=" + vote_type
  }).then(function(response) {
    alert("3");
    reRenderBadges(response);
  }).catch(function(error) {
    alert("4");
    console.log(error);
  });
  alert("5");
  return false;
}; // end addUpVote

function addDownVote() {
  form = document.forms["down_vote"];
  vote_type = "down";
  badge_id = form.elements["slogan_id"].value;
  $.ajax({
   url: 'http://localhost:3000/badges/vote',
   type: 'POST',
   data: "badge_id=" + badge_id + "&vote_type=" + vote_type
  }).then(function(response) {
    reRenderBadges(response);
  }).catch(function(error) {
    console.log(error);
  });
  return false;
}; // end addDownVote
