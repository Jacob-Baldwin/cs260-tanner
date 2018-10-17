angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('avatar', avatarDirective);


function mainCtrl ($scope, $http) {

  $scope.submitInput = function (input) {
    input_text = input.input_text;

    input.input_text = "waiting on a response...";

    $http({
      method: 'POST',
      url: "http://api.tanner.jacobbaldwin.com",
      data: '{"input_text": "' + input_text + '"}',
      headers: {'Content-Type': 'application/json'}
    }).then(function(response) {
      console.log(response.data);
      input.input_text = null;
    });
  }

  // $scope.users = []

  // $scope.addNew = function (user) {
  //   $scope.users.push({
  //     name: user.name,
  //     avatarUrl: user.url,
  //     email: user.email
  //   });

  //   user.name = '';
  //   user.url = '';
  //   user.email = '';
  // };
}

function avatarDirective () {
  return {
    scope: {
      user: '='
    },
    restrict: 'E',
    replace: 'true',
    template: (
      '<div class="Avatar">' +
        '<img ng-src="{{user.avatarUrl}}" />' +
        '<h4>{{user.name}}</h4>' +
        '<h5>{{user.email}}<h5>' +
      '</div>'
    ),
    link: link
  };

  function link (scope) {
    if (!scope.user.avatarUrl) {
      scope.user.avatarUrl = 'https://www.drupal.org/files/issues/default-avatar.png';
    }
  }

}
