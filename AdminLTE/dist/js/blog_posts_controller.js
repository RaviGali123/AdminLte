var bodyParaConcateString = '';
var bodyHeading1ConcateString = '';
var bodyHeading2ConcateString = '';
var bodyHeading3ConcateString = '';
var bodySpanConcateString = '';
var bodyImageConcateString = '';
var bodyHyperlinkConcateString = '';

var app = angular.module('blogApp', []);
app.controller('blogCtrl', function ($scope, $http) {

    $scope.GetBlogInformation = function () {

       
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
        
        alert(bodyParaConcateString);
        alert(bodyHeading1ConcateString);
        alert(bodyHeading2ConcateString);
        alert(bodyHeading3ConcateString);
        alert(bodySpanConcateString);
        alert(bodyImageConcateString);
        alert(bodyHyperlinkConcateString);

    }


    $scope.CreateBlogPost = function () {

                var strPostDesc = bodyParaConcateString + bodyHeading1ConcateString + bodyHeading2ConcateString + bodyHeading3ConcateString + bodySpanConcateString + bodyHyperlinkConcateString;
                
                var strTitle = "Share Market";
                var strDesc = strPostDesc;
                var strPrice = 10.0;
                var strDiscPrice = 5.0;
                var strPType = "Share Market";
                var strImgPath = strFirstName + strLastName;
                var strOrgName = "Marketing";
                var strUserName = angular.element(document.querySelector('#txtFirstName')).val();


                $http(
                    {
                        async: true,
                        crossDomain: true,
                        method: "POST",
                        url: "http://viitortechnologies.com/eonservices/EcomServices/product/",
                        data: {
                            "title": strTitle, "description": strDesc, "price": strPrice, "discPrice": strDiscPrice, 
                            "pType": strPType, "imgPath": strImgPath, "orgName": strOrgName, "userName": strUserName
                            },
                        headers: {
                            "Content-Type": "application/json",
                            "cache-control": "no-cache",
                            "Postman-Token": "76089fe3-6fc6-4711-9f7c-3fc-c4a2975cf"
                        },
                        processData: false

                    }).then(function successCallback(response) {

                        if (response.responseCode == 1) {

                            console.log(JSON.stringify(response));
                            alert("You have sucessfully created blog post");

                        }
                        else {

                            alert("Blog creation occurs some error");

                        }

                    }, function errorCallback(response) {

                        alert("error");

                    });

    }


    $scope.GetBlogsPosts = function () {

        
        var strIndex = "0";
        var strOrgName = "VIITOR_Healthy";
        var strMaxRecords = "0";
        var strOrder = "desc";
        var strOrderBy = "created";
        var strUserName = "VIITOR_Healthy";
        var strReferenceId = "0";
        var strFromDate = "2018-11-22";
        var strToDate = "2018-11-30";

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

                if (response.responseCode == 1) {

                    console.log("Get Blogs: " + JSON.stringify(response));
                    
                    $scope.blogInfoData = response;
                }
                else {

                    alert("No Records Found");
                    $scope.blogInfoData = '';

                }

            }, function errorCallback(response) {

                alert("error");
                $scope.blogInfoData = '';

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


});