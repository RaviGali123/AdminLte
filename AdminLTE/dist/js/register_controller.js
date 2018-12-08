//Added by Ravi

var app = angular.module('adminLte', []);

app.controller('registerCtrl', function ($scope, $http) {

    $scope.SubmitRegister = function () {

        angular.element(document.querySelector('#loader')).css('display', 'block');

        if ($scope.registerForm.$valid) {

            var strFirstName = angular.element(document.querySelector('#txtFirstNameId')).val();
            var strLastName = angular.element(document.querySelector('#txtFullNameId')).val();
            var strEmail = angular.element(document.querySelector('#txtEmailId')).val();
            var strPhoneNumber = angular.element(document.querySelector('#txtMobileNumberId')).val();
            var strPassword = angular.element(document.querySelector('#txtPasswordId')).val();
            var strRetypePassword = angular.element(document.querySelector('#txtRetypePasswordId')).val();
            var strFullName = strFirstName + strLastName;

            var strOrgRole = angular.element(document.querySelector('#dropOrgRoleId')).val();
            var strOrgFullName = angular.element(document.querySelector('#txtOrgFullNameId')).val();
            var strOrgContactNumber = angular.element(document.querySelector('#txtOrgContactNumberId')).val();
            var strOrgType = angular.element(document.querySelector('#dropOrgTypeId')).val();
            var strOrgAddress = angular.element(document.querySelector('#txtOrgAddressId')).val();

            var requestHeaderData = $scope.RequestHeaderRequestString();


            $http(
                {
                    async: true,
                    crossDomain: true,
                    method: "POST",
                    url: "http://viitortechnologies.com/eonservices/CustomerServices/createCustomer",
                    data: {
                        "firstName": strFirstName, "lastName": strLastName, "email": strEmail, "mobile": strPhoneNumber, "password": strPassword,
                        "orgRole": strOrgRole, "orgFullName": strOrgFullName, "orgPhone": strOrgContactNumber, "orgType": strOrgType, "orgAddress": strOrgAddress, "userName": strFullName,
                        "requestHeader": { "vendorID": "NA", "vendorType": "LMS", "loginId": "QATTest", "userName": "QAT Testing", "purpose": "Leads Data", "role": "GlobalAdmin", "ipAddress": "1.1.1.1.1" }
                    },
                    headers: {
                        "Content-Type": "application/json",
                        "cache-control": "no-cache",
                        "Postman-Token": "76089fe3-6fc6-4711-9f7c-3fc-c4a2975cf"
                    },
                    processData: false
                }).then(function successCallback(response) {

                    angular.element(document.querySelector('#loader')).css('display', 'none');

                    if (response.data.responseCode == 1) {

                        console.log(JSON.stringify(response.data));
                        alert("You have sucessfully registred");
                        //window.location.href = 'http://localhost:3010/#/login';

                        window.location.href = 'http://'+document.location.host+'/#/login';

                    }
                    else {
                        alert("Error occurs while creating user");
                    }

                }, function errorCallback(response) {

                    alert("error");
                    angular.element(document.querySelector('#loader')).css('display', 'none');

                });

        }

        else {

            alert("Please enter all required fields");
            angular.element(document.querySelector('#loader')).css('display', 'none');
        }

    }


    $scope.RequestHeaderRequestString = function () {

        var data = [{
            "vendorID":"NA",
            "vendorType":"LMS",
            "loginId":"QATTest",
            "userName":"QAT Testing",
            "purpose":"School Data",
            "role":"GlobalAdmin",
            "ipAddress":"1.1.1.1.1"
            }]

        return data;
    }
  
   
 });