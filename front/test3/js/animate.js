function animate(obj, target, callback) {
    // 不断点击按钮，元素的速度会越来越快，因为开启了较多的定时器，解决方法：调用之前清除其他的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长写在定时器的里面,步长值改为整数
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer); //给不同元素指定不同的定时器
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 30);
}