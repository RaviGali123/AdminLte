var strActiveStatus = '';
var scopeObj;

function GetBannerViewData() {

    scopeObj.GetBannersInfoData();
}

var app = angular.module('adminLte', ['ngStorage']);
app.controller('bannersCtrl', function ($scope, $http, $localStorage) {


    $scope.active = "Disabled";

    scopeObj = $scope;

    //alert(document.location.host);

    $scope.loginUserName = $localStorage.userName;
    $scope.loginUserName1 = $localStorage.userName;
    $scope.loginUserName2 = $localStorage.userName;

    $scope.GetActiveStatus = function (val) {
        strActiveStatus = val;
    }



    $scope.CreateBannersImages = function () {

        angular.element(document.querySelector('#loader')).css('display', 'block');

        if ($scope.bannersForm.$valid) {

            var strTitle = angular.element(document.querySelector('#txtTitleId')).val();
            var strDesc = angular.element(document.querySelector('#txtBannerDescId')).val();
            var strAuther = angular.element(document.querySelector('#txtBannerAutherId')).val();
            var strImageUrl = angular.element(document.querySelector('#txtBannerImgId')).val();
            var strThumbnailUrl = angular.element(document.querySelector('#txtBannerThumbnailUrlId')).val();
            var strActive = strActiveStatus;
            var strOrgName = $localStorage.orgName;
            var strUserName = $localStorage.userName;
            var strImageType = angular.element(document.querySelector('#comboBannerTypeId')).val();
            var strKeywords = angular.element(document.querySelector('#txtBannerKeywordId')).val();


            $http(
                {
                    async: true,
                    crossDomain: true,
                    method: "POST",
                    url: "http://viitortechnologies.com/eonservices/EcomServices/saveImages/",
                    data: {
                        "title": strTitle, "description": strDesc, "auther": strAuther, "active": strActive,
                        "imgUrl": strImageUrl, "type": strImageType, "thumbNailUrl": strThumbnailUrl, "keywords": strKeywords,
                        "orgName": strOrgName, "userName": strUserName
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
                        alert("You have sucessfully uploaded banner image");

                        //window.location.href = 'http://localhost:3010/AdminLTE//pages/Banners/banners_list.html';

                        window.location.href = 'http://' + document.location.host + '/AdminLTE//pages/Banners/banners_list.html';
                    }
                    else {

                        alert("Upload banner image occurs some error");

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



    $scope.GetBannersInfoData = function () {

        angular.element(document.querySelector('#loader')).css('display', 'block');

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
                url: "http://viitortechnologies.com/eonservices/EcomServices/getSiteImages/",
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

                    var table = $('#bannersTableData').DataTable();

                    $scope.urlData = response.data.images;

                    for (var i = 0; i <= $scope.urlData.length - 1; i++) {

                        table.row.add([
                            i + 1,
                            '<img src=' + $scope.urlData[i].thumbNailUrl + ' alt="test" style="width: 50px;height: 50px;border: 1px solid lightgray; border-radius: 60px;margin-left: 10px;"/>',
                            $scope.urlData[i].auther,
                            $scope.urlData[i].type,
                            '<a href=' + $scope.urlData[i].imgUrl + ' style="overflow: hidden; width: 100%; display: inline-block;"> ' + $scope.urlData[i].imgUrl + '</a>',
                            $scope.urlData[i].active,
                            $scope.urlData[i].createdStr,
                            '<a href=""#">Edit</a>',
                            $scope.urlData[i].id
                        ]).draw(false);

                    }

                    console.log("Get Banners Data: " + JSON.stringify(response.data));

                    angular.element(document.querySelector('#loader')).css('display', 'none');

                }
                else {

                    alert("No Records Found");
                    var table = $('#bannersTableData').DataTable();
                    table = '';

                    angular.element(document.querySelector('#loader')).css('display', 'none');

                }

            }, function errorCallback(response) {

                alert("error");
                var table = $('#bannersTableData').DataTable();
                table = '';

                angular.element(document.querySelector('#loader')).css('display', 'none');
            });

    }


});