window.addEventListener('load', function() {
    // 按钮一入就显示
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            // 手动调用点击事件
            arrow_r.click();
        }, 2000);
    });
    // 动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle')
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 记录圆圈的索引号，用自定义属性
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() { //排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈，移动ul ,ul移动的距离是：小圆圈的索引号乘以图片的宽度，注意是负值
            var index = this.getAttribute('index');
            num = index;
            circle = index; //点击某个li，就把他的索引号给circle
            console.log(focusWidth);
            console.log(index);
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 克隆第一张
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动一张
    var num = 0;
    var circle = 0; //控制圆圈的播放
    var flag = true; //节流阀
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }


            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //开启节流阀
            });
            //按钮和小圆圈一起变化
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false; //关闭节流阀
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
                // num = 0;
            }

            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true; //开启节流阀
            });
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';

    };
    // 自动播放轮播图
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000);
    // 鼠标移入显现
    // var box = document.querySelector('.right-six');
    var info = document.querySelector('.info');
    var picture = document.querySelector('.picture');
    // var sister = document.querySelector('.sister');
    var words = document.querySelector('.words');
    picture.addEventListener('mouseenter', function() {
        info.style.display = 'block';
        words.style.display = 'none';
    });
    picture.addEventListener('mouseleave', function() {
        info.style.display = 'none';
        words.style.display = 'block';
    });
});