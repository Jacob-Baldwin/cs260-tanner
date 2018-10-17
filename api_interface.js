// the length of chat history that tanner puts into the api request
const MEMORY_LENGTH = 2;

angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('chatline', chatlineDirective);


function mainCtrl ($scope, $http) {

  $scope.chat_history = [];
  $scope.submit_active = true;

  $scope.submitInput = function (input) {
    if (!$scope.submit_active) {
      return;
    }

    $scope.submit_active = false;

    input_text = "";

    for (i = Math.max($scope.chat_history.length-MEMORY_LENGTH, 0); i < $scope.chat_history.length; i++) {
      input_text += " " + $scope.chat_history[i].text;
    }

    input_text += input.input_text;

    $scope.chat_history.push({
      text: input.input_text,
      author: "User"
    });

    input.input_text = "waiting on a response...";

    request_data = {
      input_text: input_text
    }

    $http({
      method: 'POST',
      url: "http://api.tanner.jacobbaldwin.com",
      data: request_data,
      headers: {'Content-Type': 'application/json'}
    }).then(function(response) {
      $scope.chat_history.push({
        text: response.data,
        author: "Bot"
      });
      input.input_text = null;
      $scope.submit_active = true;
    }).catch(function(e) {
      input.input_text = "unable to get response, please reload the page";
      console.log(e);
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
