
var formatDate = function (originalDate) {
    if (window.moment && moment(originalDate).isValid()) {
        var nowDtTime = moment.utc();
        var feedDateTime = moment.utc(originalDate, 'YYYY-MM-DD HH-mm-ss');

        var diffSec = nowDtTime.diff(feedDateTime, 'seconds');
        var retrunVal = '';


        if (diffSec < 1) {
            return "just now";
        }

        if (diffSec < 60) {
            if (diffSec === 1) {
                return diffSec + ' sec ago';
            } else {
                return diffSec + ' secs ago';
            }
        }


        //Difference greater then 60 secs, convert it to minutes
        var diffMin = Math.floor(diffSec / 60);
        if (diffMin < 60) {
            if (diffMin === 1) {
                return diffMin + ' min ago';
            }
            else {
                return diffMin + ' mins ago';
            }
        }

        //Difference is greater than 60 minutes
        var diffHour = Math.floor(diffMin / 60);
        if (diffHour < 24) {
            if (diffHour === 1)
                return diffHour + ' hour ago';
            else
                return diffHour + ' hours ago';
        }

        //Difference is greater than 24 hours, convert it to days
        var diffDay = Math.floor(diffHour / 24);
        if (diffDay < 8) {
            if (diffDay === 1) {
                return diffDay + ' day ago';
            }
            else {
                return diffDay + ' days ago';
            }
        }

        //Difference is more than 30 days, send date as it is
        return feedDateTime.local().format('DD MMM YYYY');
    }
    else
        return '';
};

var localDate = function (originalDate) {
    if (window.moment && moment(originalDate).isValid()) {
        var feedDateTime = moment.utc(originalDate, 'YYYY-MM-DD HH-mm-ss');

        return feedDateTime.local().format('DD-MMM-YYYY hh:mm A');
    }
};

var fnDevTypeCSS = function (devType) {

    if (devType.indexOf("BB") == 0) {
        return "bg-danger";
    }
    else if (devType.indexOf("iP") == 0) {
        return "label-info";
    }
    else if (devType.indexOf("Android") == 0) {
        return "label-success";
    }
    else if (devType.length == 0) {
        return "hide";
    }
    else {
        return "label-success";
    }
}

if (Handlebars) {
    Handlebars.registerHelper("hbPrettyDate", function (datetime) {

        var formattedDate = formatDate(datetime);
        if (formattedDate == '')
            formattedDate = '-- no activity --';
        return formattedDate;
    });

    Handlebars.registerHelper("hbLocalDate", function (datetime) {
        return localDate(datetime);
    });

    Handlebars.registerHelper("hbTrimText", function (text, trimCount) {
        var textLength = text.length;

        if (textLength > trimCount) {
            return text.substring(0, trimCount - 3) + '...';
        }
        else {
            return text;
        }
    });

    Handlebars.registerHelper("hbContentTypeFull", function (type) {

        switch (type) {
            case "v": {
                return "video";
            }
            case "audio": {
                return "audio";
            }
            case "text": {
                return "text";
            }
            case "pdf": {
                return "pdf";
            }
            case "n": {
                return "newsletter";
            }
            case "article": {
                return "article";
            }
            case "p": {
                return "slide";
            }
            case "q": {
                return "quiz";
            }
            case "s": {
                return "survey";
            }
            case "embed": {
                return "embed";
            }
            case "ig": {
                return "image-gallery";
            }
        }
    });

    Handlebars.registerHelper("hbContentTypeCode", function (type) {

        switch (type) {
            case "v": {
                return "vid";
            }
            case "audio": {
                return "aud";
            }
            case "text": {
                return "txt";
            }
            case "pdf": {
                return "pdf";
            }
            case "n": {
                return "art";
            }
            case "article": {
                return "url";
            }
            case "p": {
                return "sld";
            }
            case "q": {
                return "quz";
            }
            case "s": {
                return "srv";
            }
            case "embed": {
                return "url";
            }
            case "ig": {
                return "img";
            }
        }
    });

    Handlebars.registerHelper("hbClanName", function (clanCode) {
        switch (clanCode) {
            case "CATE": {
                return "Category";
            }
            case "PUSH": {
                return "Pushed";
            }
            case "CAMP": {
                return "Campaign";
            }
            case "LIBR": {
                return "Library";
            }
            case "INBOX": {
                return "Inbox";
            }
            case "DOWNLOADS": {
                return "Downloads";
            }
            case "BROWSED": {
                return "Browsed";
            }
        }
    });

    Handlebars.registerHelper("hbDeviceTypeHTML", function (devTypeArray) {

        var objDevType = {};
        $.each(devTypeArray, function (index, value) {

            if (objDevType.hasOwnProperty(value))
                objDevType[value]++;
            else
                objDevType[value] = 1;
        });

        var htmlOutput = '';
        for (var devType in objDevType) {
            var devCount = objDevType[devType];
            var strDevType = devCount + ' ' + devType;
            var devCss = fnDevTypeCSS(devType);
            htmlOutput += ' <span class="label ' + devCss + '">' + strDevType + '</span> ';
        }

        return htmlOutput;

    });

    Handlebars.registerHelper("hbExistingUserOfCampaign", function (campId) {
        if (campId != 0) {
            return "selectedRow";
        }
        else
            return "";
    });

    Handlebars.registerHelper("hbEmailOnScheduleClassChanger", function (emailFlag) {
        if (emailFlag == 1) {
            return "linkDesignGreen";
        }
        else
            return "linkDesignRed";
    });

    Handlebars.registerHelper("hbEmailOnScheduleTextChanger", function (emailFlag) {
        if (emailFlag == 1) {
            return "Mark a copy on email: ON";
        }
        else
            return "Mark a copy on email: OFF";
    });

    Handlebars.registerHelper("hbActivityClanName", function (clanCode) {
        switch (clanCode) {
            case "VIEW": {
                return "Viewed";
            }
            case "SENT": {
                return "Sent";
            }
        }
    });

    Handlebars.registerHelper("hbWipeClassChanger", function (clanCode) {
        if (clanCode == "DOWNLOADS" || clanCode == "INBOX")
            return "contentTd";
        else
            return "contentTdOther";
    });

    Handlebars.registerHelper("optionSelection", function (clanCode) {
        var htmlOutput = '';
        if (clanCode == 0) {
            htmlOutput = "<div class='selectOption'></div>";
            return htmlOutput;
        }
        else {
            htmlOutput = htmlOutput = "<div class='selectOption' style='background-color:#008ced'> <i class='icon-circle' style='cursor: default;color:white;font-size:8px;margin-left: 0.50em;'></i> </div>";
            return htmlOutput;
        }
    });
    Handlebars.registerHelper("lhoptionSelectCount", function (clanCode) {
        var htmlOutput = '';
        if (clanCode == 0) {
            htmlOutput = "<div class='selectOption'></div>";
            return htmlOutput;
        }
        else {
            htmlOutput = "<div class='selectOption' style='background-color:#008ced'> <i class='icon-circle' style='cursor: default;color:white;font-size:8px;margin-left: 0.50em;'></i> </div>";
            return htmlOutput;
        }
    });

    Handlebars.registerHelper("hbDeviceBlockBG", function (devType) {
        if (devType.indexOf("BB") == 0) {
            return "danger";
        }
        else if (devType.indexOf("iP") == 0) {
            return "black";
        }
        else if (devType.indexOf("Android") == 0) {
            return "android";
        }
        else if (devType.indexOf("Windows") == 0) {
            return "windows";
        }
        else {
            return "";
        }

    });

    Handlebars.registerHelper("hbDeviceIcon", function (devType) {
        if (devType.indexOf("BB") == 0) {
            return "blackberry";
        }
        else if (devType.indexOf("iP") == 0) {
            return "apple";
        }
        else if (devType.indexOf("Android") == 0) {
            return "android";
        }
        else if (devType.indexOf("Windows") == 0) {
            return "windows";
        }
        else {
            return "mobile-phone";
        }
    });

    Handlebars.registerHelper("lbltotalView", function (clanCode) {
        if (clanCode == 0) {
            return "hide";
        }
       
    });

    Handlebars.registerHelper("lhbAdminBach", function (clanCode) {
        var htmlOutput = '';
        if (clanCode == 1) {
            htmlOutput = " <span style=' background-color: rgb(42, 172, 53);font-size:12px;' class='label  label-DOWNLOADS '> Admin </span>";
            return htmlOutput;
        }
        else {
            return htmlOutput;
        }
    });

    Handlebars.registerHelper("lbhdiskspace", function (diskvalue) {
        if (diskvalue == -1) {
            return "Unlimited";
        }
        else {
            return diskvalue + "GB";
        }

    });
    Handlebars.registerHelper("lbhUsercount", function (uservalue) {
        if (uservalue == -1) {
            return "Unlimited";
        }
        else {
            return uservalue;
        }

    });
    Handlebars.registerHelper("lblhsupp", function (suppvalue) {
        if (suppvalue == 0) {
            return "Email";
        }
        else {
            return "Email+Phone";
        }

    });
    Handlebars.registerHelper("lbhmsgCount", function (msgvalue) {
        if (msgvalue == -1) {
            return "Unlimited";
        }
        else {
            return msgvalue;
        }
    });
    Handlebars.registerHelper("lblcampCount", function (campvalue) {
        if (campvalue == -1) {
            return "Unlimited";
        }
        else {
            return campvalue;
        }
    });
    Handlebars.registerHelper("lbltemp", function (tempvalue) {
        if (tempvalue == 0) {
            return "None";
        }
        else {
            return tempvalue;
        }
    });
    Handlebars.registerHelper("lblplugin", function (pluginvalue) {
        if (pluginvalue == 0) {
            return "Can't connect";
        }
        else {
            return "Can Connect";
        }
    });
    Handlebars.registerHelper('JSON2string', function (object) {
        if (object != null) {
            return JSON.stringify(object);
        }
        else {
            return "";
        }
    });
    Handlebars.registerHelper("lblfbresp", function (formBuilervalue) {
        if (formBuilervalue ==-1) {
            return "Unlimited";
        }
        else {
            return formBuilervalue + "Responses";
        }
    });
   
}