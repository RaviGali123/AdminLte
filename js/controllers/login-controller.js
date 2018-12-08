app.controller('loginCtrl', [
    '$scope', '$http', '$rootScope', '$location', 'Session', 'SecurityService','$localStorage',
    function ($scope, $http, $rootScope, $location, Session, SecurityService, $localStorage) {
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

            angular.element(document.querySelector('#loader')).css('display', 'block');

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

                        if (response.data.responseHeader.responseCode == 1 && response.data.responseHeader.responseMessage == "Valid Customer") {

                            console.log(JSON.stringify(response.data));
                            $localStorage.orgName = response.data.orgName;
                            $localStorage.userName = response.data.userName;
                            alert("success");
                            //window.location.href = 'http://localhost:3010/AdminLTE//index.html';
                            window.location.href = 'http://'+document.location.host+'/AdminLTE//index.html';
                        }
                        else {

                            $localStorage.orgName = '';
                            $localStorage.userName = '';
                            alert("Invalid Customer");
                        }

                        angular.element(document.querySelector('#loader')).css('display', 'none');

                    }, function errorCallback(response) {
                        $localStorage.orgName = '';
                        $localStorage.userName = '';
                        alert("error");
                        angular.element(document.querySelector('#loader')).css('display', 'none');
                    });

            }

            else {

                alert("Please enter all required fields");
                angular.element(document.querySelector('#loader')).css('display', 'none');
            }

            //alert($localStorage.orgName);
            //alert($localStorage.userName);

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