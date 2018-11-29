//Added by Ravi

var app = angular.module('loginApp', []);

app.controller('loginCtrl', function ($scope, $http) {

    $scope.Login = function () {

        if ($scope.loginForm.$valid) {

            var strEmail = angular.element(document.querySelector('#txtLoginEmailId')).val();
            var strPassword = angular.element(document.querySelector('#txtLoginPassword')).val();


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

    


});