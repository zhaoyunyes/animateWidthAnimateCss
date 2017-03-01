/*
 * 879006948@qq.com v20170213.2
 * 参照bootstrap的动画处理相关函数,对动画没有触发的情况进行了处理
 * 支持自定义动画时长,默认动画时长是在相关css文件里面定义的
 * 优化了一些代码
 * 879006948@qq.com v20170214.1
 * 修复了一处bug: 判断支不支持animation失灵
 * 优化了一处代码: 动画结束后重置animation-duration
 *
 */
/*需要引入underscore.js*/
/*注意animation事件和transition事件不一样,所以注册$.support.transition.end可能达不到效果*/
/*推荐结合animate.css使用*/
(function($) {
    $.fn.extend({
        animateCss: function(animationName, endDuration, callback) {
            /*
             *animationName: css类,如"animated fadeIn"
             *endDuration:  动画执行时间,单位是s,如果设置了,一是用于改变动画执行的时间(执行多久),二是用于如果没有触发动画,在规定时间后触发动画结束事件
             *callback: 动画执行完成后的回调函数
             * */
//          console.log(animationName, endDuration, callback);
            var _this = this;
            if(_.isNumber(endDuration)) {
                var endDurationStr = endDuration + "s";
                _this.css({
                    "-webkit-animation-duration": endDurationStr,
                    "animation-duration": endDurationStr
                });
            } else {
//              console.log("不用修改动画执行时间");
                _this.css({
                    "-webkit-animation-duration": '',
                    "animation-duration": ''
                });
            }
            if(_.isString(animationName)) {
//              console.log("可以执行动画");
//              console.log("$.support.transition.end",$.support.transition.end);
//              console.log("$.hksupportanimation.end",$.hksupportanimation.end)
                $.hksupportanimation ? (function() {
//                  console.log("支持动画");
                    _this.addClass(animationName).one($.hksupportanimation.end, function() {
//                      console.log("动画执行完成111来自元素"+_this.html());
                        _this.removeClass(animationName).css({
                            "-webkit-animation-duration": '',
                            "animation-duration": ''
                        });
                        _.isFunction(callback) && callback();
                    });
                    //没有设置endDuration的话默认的动画执行的时间以相关css文件里面的值为准
                    _.isNumber(endDuration) && _this.emulateAnimationEnd(endDuration * 1000);
                })() : (function() {
//                  console.log("不支持动画");
                    _.isFunction(callback) && callback();
                })();
            }
            return this;
        },
        animateCssToShow: function(animationName, endDuration, callback) {
            /*假设最先display为none,先设置为block再执行动画(如果一直为none的话是没有动画效果的哦)*/
            var _this = this;
            _this.css({
                "display": "block"
            }).animateCss(animationName, endDuration, callback);
            return this;
        },
        animateCssToHide: function(animationName, endDuration, callback) { //
            /*当动画结束后把display设置为none,如果不支持动画直接设置为none*/
            var _this = this;
            _this.animateCss(animationName, endDuration, function() {
                _this.css({
                    "display": "none"
                });
                _.isFunction(callback) && callback();
            });
            return this;
        }
    });
})(jQuery);