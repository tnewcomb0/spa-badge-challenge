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
  var up_index = 0;
  var down_index = 1;
  for(var i = 0; i < allBadges.length; i++) {
    var theTemplateScript = $.select("#badge-template").innerHTML;
    var theTemplate = Handlebars.compile(theTemplateScript);
    var context={
      "index": i + 1,
      "up_index": up_index,
      "down_index": down_index,
      "title": allBadges[i].title,
      "points": allBadges[i].points,
      "badge_id": allBadges[i].id
    };
    up_index += 2;
    down_index += 2;
    var theCompiledHtml = theTemplate(context);
    $.select('.container')[0].innerHTML += theCompiledHtml;
  } // end for loop

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

function renderIndex() {
  history.pushState("", document.title, window.location.pathname + window.location.search);
  // show the index list
  var theTemplateScript = $.select("#index-template").innerHTML;
  var theTemplate = Handlebars.compile(theTemplateScript);
  var theCompiledHtml = theTemplate();
  $.select('.container')[0].innerHTML = theCompiledHtml;
}; // end renderIndex

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

function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + "; ";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}

function addUpVote(index) {
  form = document.forms[index];
  vote_type = "up";
  badge_id = form.elements["slogan_id"].value;
  if (getCookie(("badge_" + badge_id)) == "true") {
    alert("You already voted!");
  }
  else {
    $.ajax({
     url: 'http://localhost:3000/badges/vote',
     type: 'POST',
     data: "badge_id=" + badge_id + "&vote_type=" + vote_type
    }).then(function(response) {
      setCookie(("badge_" + badge_id), true);
      reRenderBadges(response);
    }).catch(function(error) {
      console.log(error);
    });
  }
  return false;
}; // end addUpVote

function addDownVote(index) {
  form = document.forms[index];
  vote_type = "down";
  badge_id = form.elements["slogan_id"].value;
  if (getCookie(("badge_" + badge_id)) == "true") {
    alert("You already voted!");
  }
  else {
    $.ajax({
     url: 'http://localhost:3000/badges/vote',
     type: 'POST',
     data: "badge_id=" + badge_id + "&vote_type=" + vote_type
    }).then(function(response) {
      setCookie(("badge_" + badge_id), true);
      reRenderBadges(response);
    }).catch(function(error) {
      console.log(error);
    });
  }
  return false;
}; // end addDownVote
