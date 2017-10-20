app.controller('SignInCtrl', ['$scope', 'api', '$cordovaOauth', function ($scope, api, $cordovaOauth) {

    $scope.vkLogin = function() {

        $cordovaOauth.vkontakte("6226635", []).then(function(result) {

            // Save session token for next requests to API

            var vkApiUrl = "https://api.vk.com/method/users.get?access_token=" + result.access_token;

            api.get(vkApiUrl, function (err, data) {
                if (err) return alert(err);

                alert(JSON.stringify(data));
            });

        }, function(error) {
            console.error(JSON.stringify(error));
        });
    };

    $scope.mailruLogin = function() {

        var clientId = '756722';

        var ref = window.open('https://connect.mail.ru/oauth/authorize?client_id=' + clientId + '&response_type=token&redirect_uri=http%3A%2F%2Fconnect.mail.ru%2Foauth%2Fsuccess.html', '_blank', 'location=no');

        ref.addEventListener('loadstart', function(event) {

            if((event.url).startsWith("http://connect.mail.ru/oauth/success.html")) {

                // Save access_token and others params for next requests to API

                // Decode string url params to object
                var params = decodeUrlParams(event.url);

                // Create md5 hash (http://api.mail.ru/docs/guides/restapi/ - Подпись запроса)
                var sig = calcMD5(params.x_mailru_vid + "app_id=" + clientId + "method=users.getInfosession_key=" + params.access_token);

                var mailruApiUrl = 'http://www.appsmail.ru/platform/api';

                // encode url params for mail.ru API
                var ulrParamsEncode = encodeURI("?method=users.getInfo&app_id=" + clientId + "&session_key=" + params.access_token + "&sig=" + sig);


                api.get(mailruApiUrl + ulrParamsEncode, function (err, data) {
                    if (err) return alert(err);

                    alert(JSON.stringify(data));
                });

                ref.close();

                /**
                 * Decode string url params to object
                 *
                 * @param url
                 */
                function decodeUrlParams(url) {
                    return JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                }
            }
        });
    };
}]);
