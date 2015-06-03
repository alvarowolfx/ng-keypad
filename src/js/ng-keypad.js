(function(){
    angular
        .module('ngKeypad', [])
        .directive('ngKeypad', ngKeypad)
        .directive('ngKey', ngKey);

function ngKeypad() {
    var directive = {
        restrict: 'E',
        scope: {
            onKeyPressed: '&'
        },
        controller: KeypadController
    }

    KeypadController.$inject = ['$scope'];

    function KeypadController(scope) {
        this.onKeyPressed = function (data) {
            scope.onKeyPressed()(data);
        }
    }

    return directive;
}

function ngKey() {
    var directive = {
        restrict: 'E',
        require: "^ngKeypad",
        transclude: true,
        template: "<a ng-transclude " +
            " ng-click='onKeyPressed(ngKeyData)' " +
            " ng-show='ngKeyData != null'> " +
            "</a>",
        scope: {
            ngKeyData: '='
        },
        link: link
    }
    return directive;

    function link(scope, element, attrs, KeypadController) {
        scope.onKeyPressed = KeypadController.onKeyPressed;
    }
}
})();
