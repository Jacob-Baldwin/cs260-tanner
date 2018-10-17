angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('chatline', chatlineDirective);


function mainCtrl ($scope, $http) {

  $scope.chat_history = [];

  $scope.submitInput = function (input) {
    input_text = input.input_text;

    $scope.chat_history.push({
      text: input_text,
      author: "User"
    });

    input.input_text = "waiting on a response...";

    $http({
      method: 'POST',
      url: "http://api.tanner.jacobbaldwin.com",
      data: '{"input_text": "' + input_text + '"}',
      headers: {'Content-Type': 'application/json'}
    }).then(function(response) {
      console.log(response.data);
      $scope.chat_history.push({
        text: response.data,
        author: "Bot"
      });
      input.input_text = null;
    });
  }
}

function chatlineDirective () {
  return {
    scope: {
      line: '='
    },
    restrict: 'E',
    replace: 'true',
    template: (
      '<p class="{{line.author}}Line">{{line.text}}</p>'
    )
  };

}
