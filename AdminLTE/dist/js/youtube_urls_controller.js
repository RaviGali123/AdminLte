var strActiveStatus = '';
var scopeObj;

function GetViewData() {

    scopeObj.GetYoutubeUrlData();

}

function GetEditYoutubeData(strYoutubeId) {
    var strVal = strYoutubeId.toString();
    //alert(strVal);
    //scopeObj.GetYoutubeUrlEditData(strVal);
}

var app = angular.module('adminLte', ['ngStorage']);
app.controller('youtubeCtrl', function ($scope, $http, $localStorage) {

    $scope.active = "Disabled";

    scopeObj = $scope;

    //alert(document.location.host);

    $scope.loginUserName = $localStorage.userName;
    $scope.loginUserName1 = $localStorage.userName;
    $scope.loginUserName2 = $localStorage.userName;

    $scope.GetActiveStatus = function (val) {
        strActiveStatus = val;
    }

    $scope.CreateYoutubeUrlUpload = function () {

        angular.element(document.querySelector('#loader')).css('display', 'block');

        if ($scope.youtubeForm.$valid) {

            var strTitle = angular.element(document.querySelector('#txtTitleId')).val();
            var strDesc = angular.element(document.querySelector('#txtDescId')).val();
            var strAuther = angular.element(document.querySelector('#txtAuthorId')).val();
            var strYoutubeUrl = angular.element(document.querySelector('#txtYoutubeUrlId')).val();
            var strImgUrl = angular.element(document.querySelector('#txtImgUrlId')).val();
            var strActive = strActiveStatus;
            var strOrgName = $localStorage.orgName;
            var strUserName = $localStorage.userName;

            $http(
                {
                    async: true,
                    crossDomain: true,
                    method: "POST",
                    url: "http://viitortechnologies.com/eonservices/EcomServices/youtubeURL/",
                    data: {
                        "title": strTitle, "description": strDesc, "auther": strAuther, "url": strYoutubeUrl,
                        "thumbNailUrl": strImgUrl, "active": strActive, "orgName": strOrgName, "userName": strUserName
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
                        alert("You have sucessfully uploaded youtube url");

                        //window.location.href = 'http://localhost:3010/AdminLTE//pages/youtubeUrls/youtubeurl_upload.html';

                        window.location.href = 'http://'+document.location.host+'/AdminLTE//pages/youtubeUrls/youtubeurl_upload.html';
                    }
                    else {

                        alert("Upload youtube url occurs some error");

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

    $scope.GetYoutubeUrlData = function () {

        angular.element(document.querySelector('#loader')).css('display','block');

        var strIndex = "0";
        var strOrgName = $localStorage.orgName;
        var strMaxRecords = "0";
        var strOrder = "desc";
        var strOrderBy = "created";
        var strUserName = $localStorage.userName;
        var strReferenceId = "0";
        var strFromDate = "2018-11-01";
        var strToDate = "2030-12-01";

        //alert($localStorage.orgName);
        //alert($localStorage.userName);

        $http(
            {
                async: true,
                crossDomain: true,
                method: "GET",
                url: "http://viitortechnologies.com/eonservices/EcomServices/getYoutubeURLs",
                params: {

                },
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "Postman-Token": "76089fe3-6fc6-4711-9f7c-3fc-c4a2975cf",
                    "index": strIndex, "orgName": strOrgName, "order": strOrder,
                    "orderBy": strOrderBy, "userName": strUserName, "refId": strReferenceId,
                    "fromDate": strFromDate, "toDate": strToDate, "maxRecords": strMaxRecords
                },
                processData: false

            }).then(function successCallback(response) {



                if (response.data.responseCode == 0) {

                    var table = $('#youtubedatatable').DataTable();

                    $scope.urlData = response.data.youtube;

                    for (var i = 0; i <= $scope.urlData.length - 1; i++) {

                        table.row.add([
                            i + 1,
                            '<img src=' + $scope.urlData[i].thumbNailUrl + ' alt="test" style="width: 50px;height: 50px;border: 1px solid lightgray; border-radius: 60px;margin-left: 10px;"/>',
                            $scope.urlData[i].title,
                            $scope.urlData[i].auther,
                            '<a> ' + $scope.urlData[i].url + '</a>',
                            $scope.urlData[i].active,
                            $scope.urlData[i].createdStr,
                            '<a href=""#">Edit</a>',
                            $scope.urlData[i].id
                        ]).draw(false);

                    }

                    console.log("Get Youtube: " + JSON.stringify(response.data));

                    angular.element(document.querySelector('#loader')).css('display', 'none');

                }
                else {

                    alert("No Records Found");
                    var table = $('#youtubedatatable').DataTable();
                    table = '';

                    angular.element(document.querySelector('#loader')).css('display', 'none');

                }

            }, function errorCallback(response) {

                alert("error");
                var table = $('#youtubedatatable').DataTable();
                table = '';

                angular.element(document.querySelector('#loader')).css('display', 'none');
            });

    }

    $scope.DisplaySection1 = function () {

        angular.element(document.querySelector('#section1')).css('display', 'block');
        angular.element(document.querySelector('#section2')).css('display', 'none');
      

    }

    $scope.DisplaySection2 = function () {

        angular.element(document.querySelector('#section1')).css('display', 'none');
        angular.element(document.querySelector('#section2')).css('display', 'block');

        $scope.GetYoutubeUrlData();
       
    }

    $scope.GoToYoutubeUrls = function () {

        angular.element(document.querySelector('#section1')).css('display', 'none');
        angular.element(document.querySelector('#section2')).css('display', 'block');
    }

    $scope.LogOut = function () {

        window.location.href = 'http://' + document.location.host + '/#/login';
    }


    $scope.GetYoutubeUrlEditData = function (strYoutubeId) {

        angular.element(document.querySelector('#loader')).css('display', 'block');

        var strIndex = "0";
        var strOrgName = $localStorage.orgName;
        var strMaxRecords = "0";
        var strOrder = "desc";
        var strOrderBy = "created";
        var strUserName = $localStorage.userName;
        var strReferenceId = strYoutubeId;
        var strFromDate = "2018-11-01";
        var strToDate = "2030-12-01";

        //alert($localStorage.orgName);
        //alert($localStorage.userName);

        $http(
            {
                async: true,
                crossDomain: true,
                method: "GET",
                url: "http://viitortechnologies.com/eonservices/EcomServices/getYoutubeURLs",
                params: {

                },
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    "Postman-Token": "76089fe3-6fc6-4711-9f7c-3fc-c4a2975cf",
                    "index": strIndex, "orgName": strOrgName, "order": strOrder,
                    "orderBy": strOrderBy, "userName": strUserName, "refId": strReferenceId,
                    "fromDate": strFromDate, "toDate": strToDate, "maxRecords": strMaxRecords
                },
                processData: false

            }).then(function successCallback(response) {



                if (response.data.responseCode == 0) {

                    console.log("Get Youtube Edit Data: " + JSON.stringify(response.data));

                    angular.element(document.querySelector('#loader')).css('display', 'none');

                }
                else {

                    alert("No Records Found");
                    angular.element(document.querySelector('#loader')).css('display', 'none');

                }

            }, function errorCallback(response) {

                alert("error");
                angular.element(document.querySelector('#loader')).css('display', 'none');

            });

    }


});