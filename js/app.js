miniQuery.ready( function() {
  window.onhashchange = getPersonBadges;
});

var getPersonBadges = function() {
  var personName = location.hash;

  // use ajax to send name to api
  miniQuery.ajax({
   url: 'http://localhost:3000/badges',
   type: 'POST',
   data: personName
  }).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.log(error);
  });
}
