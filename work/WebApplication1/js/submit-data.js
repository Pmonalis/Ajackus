$(document).ready(function () {
    //fnsubmitdata();
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
var chemistname ;
var address ;
var Phnno ;
var pincode;

var fnsubmitdata = function () {
    var reqUrl = 'api/chemistssubmit';
    var reqType = 'POST';
    var reqHeader = '';
    var reqData = { chemistname: chemistname, address: address, Phnno: Phnno, pincode: pincode };

    function onSuccess(respData) {
        var data = JSON.parse(respData);
    }
    function onError(err) {
        var error = err;
    }

    fnAjax(reqUrl, reqType, reqHeader, reqData, onSuccess, onError);
}
function onEvent() {
    $('#btnsubmit').off('click').on('click', function (e) {
        chemistname = $('#chemist_name').val();
        address = $('#address').val();
        Phnno = $('#phoneno').val();
        pincode = $('#pincode').val();
       
        fnsubmitdata();

    });
}