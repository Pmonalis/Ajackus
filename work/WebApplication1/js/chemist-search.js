$(document).ready(function () {
    fnGetChemists();
    onEvent();
});

function fnAjax(reqUrl, reqType, reqHeader, reqData, onSuccess, onError) {
    $.ajax({
        url: reqUrl,
        method: reqType,
        header: reqHeader,
        data: reqData,
        success: onSuccess,
        error: onError
    });
}

var searchkey;
var lstchemistId=0 ;
var isLoadMore = false;


var fnGetChemists = function ()
  {
    var reqUrl = 'api/chemistssearch';
    var reqType = 'GET';
    var reqHeader = '';
    var reqData = { pin_code: searchkey, index1: lstchemistId };

    function onSuccess(respData) {
        var data = JSON.parse(respData);//if the value was in string

        var html = fnHandlebar('template-chemist-list', data);

        if (!isLoadMore) {
            $('#chemistList').html(html);
        }
        else {

            $('#chemistList').append(html);
        }

        //alert(JSON.stringify(data));
        //bind data to UI
    }

    function onError(err) {
        var error = err;
    }

    fnAjax(reqUrl, reqType, reqHeader, reqData, onSuccess, onError);
}

function fnHandlebar(templateId, data) {

    var source = $("#" + templateId).html();
    var template = Handlebars.compile(source);
    var html = template(data);

    return html;
}

function onEvent() {
    $('#btnSearchChemist').off('click').on('click', function (e) {
        e.preventDefault();

        isLoadMore = false;
        pageno = 1;
        searchkey = $('#Search').val();

        fnGetChemists();

    });

    $('#loadmore').off('click').on('click', function (e) {

        isLoadMore = true;

        e.preventDefault();
  
        lstchemistId = $("#chemistList div:last-child").data('chemist_id');
        fnGetChemists();
    })
}