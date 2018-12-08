var bodyParaConcateString = '';
var bodyHeading1ConcateString = '';
var bodyHeading2ConcateString = '';
var bodyHeading3ConcateString = '';
var bodySpanConcateString = '';
var bodyImageConcateString = '';
var bodyHyperlinkConcateString = '';



var strActiveStatus = '';
var scopeObj;


function GetViewData() {

    scopeObj.GetBlogsPosts();
}

function GetBannersData(blogId) {

    scopeObj.GetBanners(blogId);
}

var app = angular.module('adminLte', ['ngStorage', 'ui.bootstrap']);

app.controller('blogCtrl', function ($scope, $http, $localStorage, $dialog) {

    $scope.active = "Disabled";
    scopeObj = $scope;

    $scope.loginUserName = $localStorage.userName;
    $scope.loginUserName1 = $localStorage.userName;
    $scope.loginUserName2 = $localStorage.userName;

    //alert($localStorage.orgName + "   " + $localStorage.userName);


    var dialogOptions = {
        controller: 'PopuPCtrl',
        templateUrl: '../../pages/PopUp.html'
    };

    $scope.PoupDisplay = function () {

        $dialog.dialog(angular.extend(dialogOptions))
            .open()
            .then(function (result) {
                if (result) {
                    angular.copy(result);
                }
                
            });
    }

    $scope.GetActiveStatus = function (val) {
        strActiveStatus = val;
    }

    $scope.GetBlogInformation = function () {

        angular.element(document.querySelector('#loader')).css('display', 'block');

        if ($scope.blogsForm.$valid) {

            bodyParaConcateString = '';
            bodyHeading1ConcateString = '';
            bodyHeading2ConcateString = '';
            bodyHeading3ConcateString = '';
            bodySpanConcateString = '';
            bodyImageConcateString = '';
            bodyHyperlinkConcateString = '';

            var bodyInfoPara = $('.cke_wysiwyg_frame').contents().find('p');
            var bodyInfoHeading1 = $('.cke_wysiwyg_frame').contents().find('h1');
            var bodyInfoHeading2 = $('.cke_wysiwyg_frame').contents().find('h2');
            var bodyInfoHeading3 = $('.cke_wysiwyg_frame').contents().find('h3');
            var bodyInfoSpan = $('.cke_wysiwyg_frame').contents().find('span');
            var bodyInfoImage = $('.cke_wysiwyg_frame').contents().find('img');
            var bodyInfoHyperlink = $('.cke_wysiwyg_frame').contents().find('a');



            if (bodyInfoPara != '' && bodyInfoPara != null && bodyInfoPara != undefined) {

                for (var i = 0; i < bodyInfoPara.length; i++) {

                    bodyParaConcateString += bodyInfoPara[i].innerHTML;

                }
            }

            if (bodyInfoHeading1 != '' && bodyInfoHeading1 != null && bodyInfoHeading1 != undefined) {

                for (var i = 0; i < bodyInfoHeading1.length; i++) {

                    bodyHeading1ConcateString += bodyInfoHeading1[i].innerHTML;

                }
            }

            if (bodyInfoHeading2 != '' && bodyInfoHeading2 != null && bodyInfoHeading2 != undefined) {

                for (var i = 0; i < bodyInfoHeading2.length; i++) {

                    bodyHeading2ConcateString += bodyInfoHeading2[i].innerHTML;

                }
            }

            if (bodyInfoHeading3 != '' && bodyInfoHeading3 != null && bodyInfoHeading3 != undefined) {

                for (var i = 0; i < bodyInfoHeading3.length; i++) {

                    bodyHeading3ConcateString += bodyInfoHeading3[i].innerHTML;

                }
            }

            if (bodyInfoSpan != '' && bodyInfoSpan != null && bodyInfoSpan != undefined) {

                for (var i = 0; i < bodyInfoSpan.length; i++) {

                    bodySpanConcateString += bodyInfoSpan[i].innerHTML;

                }
            }

            if (bodyInfoImage != '' && bodyInfoImage != null && bodyInfoImage != undefined) {

                for (var i = 0; i < bodyInfoImage.length; i++) {

                    bodyImageConcateString += bodyInfoImage[i].innerHTML;

                }
            }

            if (bodyInfoHyperlink != '' && bodyInfoHyperlink != null && bodyInfoHyperlink != undefined) {

                for (var i = 0; i < bodyInfoHyperlink.length; i++) {

                    bodyHyperlinkConcateString += bodyInfoHyperlink[i].innerHTML;

                }
            }

            var test = $('.cke_wysiwyg_frame').find('img').attr('src');


            $scope.CreateBlogPost();
        }

        else {

            alert("Please enter all required fields");
            angular.element(document.querySelector('#loader')).css('display', 'none');
        }

    }


    $scope.CreateBlogPost = function () {

                angular.element(document.querySelector('#loader')).css('display', 'block');

                var strPostDesc = bodyParaConcateString + bodyHeading1ConcateString + bodyHeading2ConcateString + bodyHeading3ConcateString + bodySpanConcateString + bodyHyperlinkConcateString + bodyImageConcateString;
              
                var strTitle = angular.element(document.querySelector('#txtTitleId')).val();
                var strAuther = angular.element(document.querySelector('#txtAutherId')).val();
                var strImgUrl = angular.element(document.querySelector('#txtImgUrlId')).val();
                var strBanner1 = angular.element(document.querySelector('#txtBanner1')).val();
                var strBanner2 = angular.element(document.querySelector('#txtBanner2')).val();
                var strBanner3 = angular.element(document.querySelector('#txtBanner3')).val();
                var strActiveVal = strActiveStatus;
                var strOrgName = $localStorage.orgName;
                var strUserName = $localStorage.userName;


                $http(
                    {
                        async: true,
                        crossDomain: true,
                        method: "POST",
                        url: "http://viitortechnologies.com/eonservices/EcomServices/blog/",
                        data: {
                            "title": strTitle, "description": strPostDesc, "auther": strAuther, "imgUrls": strImgUrl,
                            "active": strActiveVal, "orgName": strOrgName, "userName": strUserName,
                            "banner1": strBanner1, "banner2": strBanner2, "banner3": strBanner3
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
                            alert("You have sucessfully created blog post");

                            //window.location.href = 'http://localhost:3010/AdminLTE//pages/forms/editors.html';

                            window.location.href = 'http://'+document.location.host+'/AdminLTE//pages/forms/editors.html';
                        }
                        else {

                            alert("Blog creation occurs some error");

                        }

                    }, function errorCallback(response) {

                        alert("error");
                        angular.element(document.querySelector('#loader')).css('display', 'none');

                    });

    }


    $scope.GetBlogsPosts = function () {

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

        //alert($localStorage.userName);
        //alert($localStorage.orgName);


        $http(
            {
                async: true,
                crossDomain: true,
                method: "GET",
                url: "http://viitortechnologies.com/eonservices/EcomServices/getBlogs",
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

                    $scope.blogInfoData = response.data.blogs;
                    
                    var table = $('#example').DataTable();

                    for (var i = 0; i <= $scope.blogInfoData.length - 1; i++) {

                        table.row.add([
                            i + 1,
                            '<img src=' + $scope.blogInfoData[i].imgUrls + ' alt="test" style="width: 50px;height: 50px;border: 1px solid lightgray; border-radius: 60px;margin-left: 10px;"/>',
                            $scope.blogInfoData[i].title,
                            $scope.blogInfoData[i].auther,
                             $scope.blogInfoData[i].active,
                            $scope.blogInfoData[i].createdStr,
                            '<a href="#">Preview</a> &nbsp;&nbsp;&nbsp; <a href="#">Edit</a>',
                            $scope.blogInfoData[i].bId
                        ]).draw(false);

                    }

                    console.log("Get Blogs: " + JSON.stringify($scope.blogInfoData));
                    
                }
                else {

                    alert("No Records Found");
                    $scope.blogInfoData = '';
                    var table = $('#example').DataTable();
                    table = '';

                }

                angular.element(document.querySelector('#loader')).css('display', 'none');

            }, function errorCallback(response) {

                alert("error");
                $scope.blogInfoData = '';
                var table = $('#example').DataTable();
                table = '';
                angular.element(document.querySelector('#loader')).css('display', 'none');
            });

    }

    $scope.DisplayEditorsSection = function () {

        angular.element(document.querySelector('#BlogsListView')).css('display', 'none');
        angular.element(document.querySelector('#ckEditorSection')).css('display', 'block');
        angular.element(document.querySelector('#bootstrapEditorSection')).css('display', 'block');

    }

    $scope.GoToBlogPosts = function () {

        angular.element(document.querySelector('#BlogsListView')).css('display', 'block');
        angular.element(document.querySelector('#ckEditorSection')).css('display', 'none');
        angular.element(document.querySelector('#bootstrapEditorSection')).css('display', 'none');
    }

    $scope.LogOut = function () {

        window.location.href = 'http://' + document.location.host + '/#/login';
    }


    $scope.GetBanners = function (blogId) {

        //alert("test");

        angular.element(document.querySelector('#loader')).css('display', 'block');

        var strIndex = "0";
        var strOrgName = $localStorage.orgName;
        var strMaxRecords = "0";
        var strOrder = "desc";
        var strOrderBy = "created";
        var strUserName = $localStorage.userName;
        var strReferenceId = blogId;
        var strFromDate = "2018-11-01";
        var strToDate = "2030-12-01";

        //alert($localStorage.userName);
        //alert($localStorage.orgName);


        $http(
            {
                async: true,
                crossDomain: true,
                method: "GET",
                url: "http://viitortechnologies.com/eonservices/EcomServices/getBlogs",
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

                    

                    $scope.bannerModel1 = response.data.blogs[0].banner1;
                    $scope.bannerModel2 = response.data.blogs[0].banner1;
                    $scope.bannerModel3 = response.data.blogs[0].banner1;
                    $scope.popUpBlogDesc = response.data.blogs[0].description;

                    var itemToEdit = response.data.blogs[0];

                    $dialog.dialog(angular.extend(dialogOptions, { resolve: { item: angular.copy(itemToEdit) } }))
                        .open()
                        .then(function (result) {
                            if (result) {
                                angular.copy(result, itemToEdit);
                            }
                            itemToEdit = undefined;
                        });

                    console.log("Get Banners: " + JSON.stringify(response.data.blogs[0]));

                }
                else {

                    $scope.bannerModel1 = '';
                    $scope.bannerModel2 = '';
                    $scope.bannerModel3 = '';
                    $scope.popUpBlogDesc = '';

                    alert("No Records Found");

                }

                angular.element(document.querySelector('#loader')).css('display', 'none');

            }, function errorCallback(response) {

                $scope.bannerModel1 = '';
                $scope.bannerModel2 = '';
                $scope.bannerModel3 = '';
                $scope.popUpBlogDesc = '';
                alert("error");
                angular.element(document.querySelector('#loader')).css('display', 'none');
            });

    }


   

   


});


app.controller('PopuPCtrl', function ($scope, item, dialog) {

    $scope.item = item;

    $scope.close = function () {
        dialog.close();
    };


});