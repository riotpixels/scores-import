function callback(){
    (function($){
        $.extend({
            stringify : function stringify(obj) {
                var t = typeof (obj);
                if (t != "object" || obj === null) {
                    if (t == "string") obj = '"' + obj + '"';
                    return String(obj);
                } else {
                    var n, v, json = [], arr = (obj && obj.constructor == Array);
                    for (n in obj) {
                        v = obj[n];
                        t = typeof(v);
                        if (obj.hasOwnProperty(n)) {
                            if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = $.stringify(v);
                            json.push((arr ? "" : '"' + n + '":') + String(v));
                        }
                    }
                    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
                }
            }
        });

        var res = [];
        $('table#list_table').find('td script').each(function(i, el){
            var row = $(el).text();
            var re = /user_game_scores\((\d+)\s*,\s*(\d+)\);/i;
            var match = row.match(re);
            if(match){
                res.push({id: parseInt(match[1]), v: parseInt(match[2])});
            }
        });
        res = {s: 'ag.ru', d: res};
        var text = $.stringify(res, null, 2);
        var ta = $('textarea.rp-import');
        if(!ta.length){
            ta = $('<textarea class="rp-import"></textarea>').insertBefore('table#list_table');
            var d = $('<div class="casual_title"/>').text('Скопируйте код ниже и вернитесь на закладку с RiotPixels').insertBefore(ta);
            ta.css({'height':'50px'});
            ta.bind('copy cut', function() {
                setTimeout(function(){
                    ta.remove();
                    d.remove();
                }, 300);
            });
        }
        ta.val(text);
        ta.focus().select();
    })(jQuery.noConflict(true))
}
var s=document.createElement("script");
s.src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
if(s.addEventListener){
    s.addEventListener("load", callback, false)
}
else if(s.readyState){
    s.onreadystatechange=callback
}
document.body.appendChild(s);

