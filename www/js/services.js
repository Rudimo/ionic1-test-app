var app = angular.module('test-app.services', []);

app.factory('api', ['$http', function ($http) {
    'use strict';

    return {

        /**
         * Make a POST request to API
         * @param path
         * @param data
         * @param callback
         */
        post: function (path, headers, data, callback) {

            if (typeof callback !== 'function') callback = function () {};

            if (path && path.indexOf('/') !== 0) {
                path = '/' + path;
            }

            $http({
                withCredentials: true,
                method: 'POST',
                url: $location.protocol() + '://' + $location.host() + ':' + $location.port() + path,
                data: data,
                headers: headers
            }).success(function (response, status) {

                //console.log(response);
                //console.log(status);

                if ([200, 302].indexOf(status) == -1) {
                    console.log(response.error || 'Произошла ошибка, попробуйте позднее, код ' + status);
                    alert(response.error || 'Произошла ошибка, попробуйте позднее, код ' + status);
                    return callback(new Error('Request fails'));
                }

                if (response.result === 'ERR') {

                    if (response.errors && response.errors.length > 0) {
                        response.errors.forEach(function (error) {
                            alert(error);
                        });
                    } else {
                        alert('Произошла неизвестная ошибка, попробуйте позднее');
                    }

                    return callback(new Error(response.error || 'Error occurred'));
                }

                callback(null, response);

            }).error(function (response, status) {

                if (status) {
                    alert('Сервис временно недоступен, пожалуйста, попробуйте позднее. Код ' + status);
                } else {
                    alert('Сервис временно недоступен, пожалуйста, попробуйте позднее.');
                }

                console.error("api call '" + path + "' failed, status = " + status);

                callback(new Error('api call ' + path + ' failed, status = ' + status));
            });
        },

        /**
         * Make a GET request to API
         * @param url
         * @param callback
         */
        get: function (url, callback) {

            if (typeof callback !== 'function') callback = function () {};

            $http({
                withCredentials: true,
                method: 'GET',
                url: url
            }).success(function (response, status) {

                if (status != 200) {
                    alert(response.error || 'Произошла ошибка, попробуйте позднее, код ' + status);
                    return callback(new Error('Request fails'));
                }

                if (response.result === 'ERR') {

                    if (response.errors && response.errors.length > 0) {
                        response.errors.forEach(function (error) {
                            alert(error);
                        });
                    } else {
                        alert('Произошла неизвестная ошибка, попробуйте позднее');
                    }

                    return callback(new Error(response.error || 'Error occurred'));
                }

                callback(null, response);

            }).error(function (response, status) {

                if (status) {
                    alert('Сервис временно недоступен, пожалуйста, попробуйте позднее. Код ' + status);
                } else {
                    alert('Сервис временно недоступен, пожалуйста, попробуйте позднее.');
                }

                console.error("api call '" + url + "' failed, status = " + status);

                callback(new Error('api call ' + url + ' failed, status = ' + status));
            });
        }
    };
}]);