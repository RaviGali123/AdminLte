app.controller('loginCtrl', [
    '$scope', '$http', '$rootScope', '$location', 'Session', 'SecurityService',
    function ($scope, $http, $rootScope, $location, Session, SecurityService) {
        $scope.pageClass = 'page-login';

        if (localStorage.getItem('session_token'))//Si existe sesion redirijimos al dashboard
            $location.url("/dashboard");

        $scope.logindisabled = false;
        $scope.user = { email: 'dedd1993@gmail.com', password: '123456' };

        $scope.login = function () {
            // $location.url("/dashboard"); // Just if session is not implemented
            // return;

            $scope.logindisabled = true;

            Session.login($scope.user).then(function successCallback(response) {
                if (response.data.auth == true) {
                    SecurityService.init(response.data.data);

                } else {
                    $scope.loginAlert = { message: response.data.data, style: { 'color': 'red' } };
                    $scope.logindisabled = false;
                }
            });
        };

        //Added by Ravi

        $scope.Login = function () {

            if ($scope.userForm.$valid) {

                var strEmail = angular.element(document.querySelector('#txtLoginEmailId')).val();
                var strPassword = angular.element(document.querySelector('#txtLoginPasswordId')).val();


                $http(
                    {
                        async: true,
                        crossDomain: true,
                        method: "POST",
                        url: "http://viitortechnologies.com/eonservices/CustomerServices/checkLogin",
                        data: { "email": strEmail, "password": strPassword, "requestHeader": { "vendorID": "NA", "vendorType": "LMS", "loginId": "QATTest", "userName": "QAT Testing", "purpose": "Leads Data", "role": "GlobalAdmin", "ipAddress": "1.1.1.1.1" } },
                        headers: {
                            "Content-Type": "application/json",
                            "cache-control": "no-cache",
                            "Postman-Token": "76089fe3-6fc6-4711-9f7c-3fc-c4a2975cf"
                        },
                        processData: false
                    }).then(function successCallback(response) {

                        if (response.status == 200 && response.statusText == "OK") {

                            console.log(JSON.stringify(response));
                            alert("success");
                            window.location.href = 'http://localhost:3010/AdminLTE//index.html';
                        }
                        

                    }, function errorCallback(response) {

                        alert("error");

                    });

            }

            else {

                alert("Please enter all required fields");
            }
      }



    // AdminLTE estilos
    $(function () {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
      });
    });
  }
]);