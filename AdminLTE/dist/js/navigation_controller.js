function NavigateToBlogsPage() {

    alert("test");

    window.location.href = 'http://localhost:3010/AdminLTE//pages/youtubeUrls/youtubeurl_upload.html';

    angular.element(document.querySelector('#BlogsListView')).css('display', 'none');
    angular.element(document.querySelector('#ckEditorSection')).css('display', 'block');
    angular.element(document.querySelector('#bootstrapEditorSection')).css('display', 'block');

}

function NavigateToYoutubePage() {

    alert("test");

    window.location.href = 'http://localhost:3010/AdminLTE//pages/forms/editors.html#';

    angular.element(document.querySelector('#section1')).css('display', 'none');
    angular.element(document.querySelector('#section2')).css('display', 'block');
}