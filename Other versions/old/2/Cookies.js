//Thanks http://www.w3schools.com/js/js_cookies.asp
function setCookie(c_name,c_value,exdays) {
	   var exdate=new Date();
	   exdate.setDate(exdate.getDate() + exdays);
	   document.cookie=encodeURIComponent(c_name) 
	     + "=" + encodeURIComponent(c_value)
	     + (!exdays ? "" : "; expires="+exdate.toUTCString());
	     ;
	}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}