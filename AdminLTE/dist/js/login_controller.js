//Added by Ravi

var app = angular.module('adminLte', ['ngStorage']);

app.controller('loginCtrl', function ($scope, $http,$localStorage) {

    $scope.Login = function () {

        angular.element(document.querySelector('#loader')).css('display', 'block');

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

                    angular.element(document.querySelector('#loader')).css('display', 'none');

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
    }

    


});