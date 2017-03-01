/*zhaoyun 879006948@qq.com v20170213.1*/
+function($) {
    function transitionEnd() {
        var el = document.createElement('hk'); //创建一个自定义标签做测试

        var transitionEndEvenNnames = { //用于检测CSS3 animation结束时的回调事件名称
            'transition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
            'OTransition': 'oTransitionEnd otransitionend',
            'MozTransition': 'transitionend'
        }

        for(var name in transitionEndEvenNnames) {
            if(el.style[name] !== undefined) {
                return {
                    end: transitionEndEvenNnames[name]
                };
            }
        }
        return false;
    }

    $.fn.emulateTransitionEndHk = function(duration) {
        var called = false,
            $el = this;
        $(this).one($.hksupporttransition.end, function() {
            called = true;
        });
        var callback = function() {
            if(!called) $($el).trigger($.hksupporttransition.end);
        };
        setTimeout(callback,duration);
        return this;
    };
    $(function(){
        $.hksupporttransition = transitionEnd();
    });
}(jQuery);