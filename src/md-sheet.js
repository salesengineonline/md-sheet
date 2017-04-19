
    'use strict';
    var stateProvider;
    angular.module('md-sheet',[])
        .directive('mdSheet', ['$timeout', '$mdTheming', '$animate', '$mdUtil', '$state', '$mdSheet', function ($timeout, $mdTheming, $animate, $mdUtil, $state, $mdSheet) {
            return {
                restrict: 'E',
                scope: {
                    title: '@',
                    action: '@',
                    form: '=',
                    size: '=',
                    submit: '&',
                    onClose: '&?'
                },
                transclude: true,
                templateUrl: 'views/md-sheet/md-sheet.html',
                link: function (scope, element) {
                    var initialSize = scope.size;
                    scope.offset = 0;
                    $mdTheming(element);
                    scope.wrapper = angular.element(element[0].querySelector('.reveal-wrapper'));
                    scope.container = angular.element(element[0].querySelector('.reveal-container'));
                    scope.bd = angular.element(element[0].querySelector('.md-backdrop-animation'));


                    scope.expand = function (prev) {
                        $timeout(function () {
                            scope.offset = scope.size - prev.size < 0 ? Math.abs(scope.size - prev.size) + prev.offset + 10 : prev.offset + 10;
                        });
                    };
                    scope.collapse = function (prev) {
                        $timeout(function () {
                            scope.offset = !prev ? 0 : prev.offset + 10;
                        });
                    };

                    scope.$on('$destroy', function () {
                        $mdSheet.pop(scope);
                    });

                    scope.close = function () {
                        $timeout(function () {
                            return $state.go('^');
                        }, 50);
                    };
                    $mdSheet.push(scope);
                },
                controller: function ($scope) {
                    this.scope = function () {
                        return $scope;
                    };
                }
            };
        }]).directive('mdSheetHeader', ['$$rAF', '$mdTheming', '$animate', '$mdUtil', '$state', '$mdSheet', function ($$rAF, $mdTheming, $animate, $mdUtil, $state, $mdSheet) {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            transclude: true,
            require: '^md-sheet',
            templateUrl: 'views/md-sheet/md-sheet-header.html',
            link: function (scope, element, attr, controller) {
                $mdTheming(element);
                scope.close = controller.scope().close;
            }
        };
    }]).directive('mdSheetTitle', ['$$rAF', '$mdTheming', '$animate', '$mdUtil', '$state', '$mdSheet', function ($$rAF, $mdTheming, $animate, $mdUtil, $state, $mdSheet) {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            transclude: true,
            templateUrl: 'views/md-sheet/md-sheet-title.html',
            link: function (scope, element, attr, controller) {
                $mdTheming(element);
            }
        };
    }]).directive('mdSheetActions', ['$$rAF', '$mdTheming', '$animate', '$mdUtil', '$state', '$mdSheet', function ($$rAF, $mdTheming, $animate, $mdUtil, $state, $mdSheet) {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            transclude: true,
            templateUrl: 'views/md-sheet/md-sheet-actions.html',
            link: function (scope, element, attr, controller) {
                $mdTheming(element);
            }
        };
    }]).directive('mdSheetContent', ['$$rAF', '$mdTheming', '$animate', '$mdUtil', '$state', '$mdSheet', function ($$rAF, $mdTheming, $animate, $mdUtil, $state, $mdSheet) {
        return {
            replace: true,
            restrict: 'E',
            scope: {},
            transclude: true,
            templateUrl: 'views/md-sheet/md-sheet-content.html',
            link: function (scope, element, attr, controller) {
                $mdTheming(element);
            }
        };
    }]).service('$mdSheet', ['$q', '$state', function ($q, $state) {
        var sheets = [];
        var states = [];
        return {
            push: function (scope) {
                sheets.push(scope);
                if (sheets.length > 1) {
                    for (var idx = sheets.length - 2; idx >= 0; --idx) {
                        sheets[idx].expand(sheets[idx+1]);
                    }
                }
            },
            pop: function (scope) {
                sheets.pop(scope);
                if (sheets.length >= 1) {
                    sheets[sheets.length-1].collapse();
                    for (var idx = sheets.length - 2; idx >= 0; --idx) {
                        sheets[idx].collapse(sheets[idx+1]);
                    }
                }
            },
            appendState: function (name, view, controller, templateUrl) {
                var stateName = $state.current.name + '.' + name;
                if (!states[stateName]) {
                    var state = {
                        name: stateName,
                        url: '/' + name,
                        views: {},
                        params: {
                            'model': null
                        }
                    };
                    state.views[view] = {
                        controller: controller,
                        templateUrl: templateUrl
                    };

                    states[stateName] = stateProvider.state(state);
                }
            }
        };
    }]).config(['$stateProvider', function ($stateProvider) {
        stateProvider = $stateProvider;
    }]).directive('mdSheetTrigger', ['$$rAF', '$mdTheming', '$animate', '$mdUtil', '$state', '$mdSheet', '$controller', function ($$rAF, $mdTheming, $animate, $mdUtil, $state, $mdSheet, $controller) {
        return {
            restrict: 'EA',
            scope: {
                trigger: '@',
                template: '@',
                controller: '@',
                manual: '=',
                view: '@',
                ngModel: '='
            },
            transclude: true,
            templateUrl: 'views/md-sheet/md-sheet-trigger.html',
            link: function (scope, element) {
                $mdTheming(element);
                scope.state = $state;

                scope.$watch('state.current', function (_new, _old) {
                    if (_new != _old) {
                        $mdSheet.appendState(scope.trigger, scope.view, scope.controller, scope.template);
                    }
                });
                $mdSheet.appendState(scope.trigger, scope.view, scope.controller, scope.template);

                scope.go = function () {
                    $state.go($state.current.name + '.' + scope.trigger, {model: scope.ngModel}).then(function () {
                        console.log('done', $state.current);
                    });
                };
            }
        };
    }]);

