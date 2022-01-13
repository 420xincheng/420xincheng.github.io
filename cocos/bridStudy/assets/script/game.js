cc.Class({
    extends: cc.Component,

    properties: {
        skyNode: cc.Node,//获取背景节点
        pipeNode: cc.Node,// 获取管道节点
        birdNode: cc.Node,//获取小鸟节点
        clickLayerNode: cc.Node,//获取点击节点
        scoreNode: cc.Node,//获取分数节点
        playNode: cc.Node,//开始游戏的图片
        numNode: cc.Node,///加分动画
        gameOverNode: cc.Node,//gameOver的图片
        birdSkinNode: {//存放所有小鸟图片
            default: [],//默认容器
            type: cc.SpriteFrame//类型
        },
        clip: {//获取音频
            default: [],
            type: cc.AudioClip
        }

    },

    onClickBagButton(event, data) {//点击打开背包 
        if (data == "bag") { //判断接受的数据是否为bag
            this.showBag();//执行显示背包方法
        } else {
            cc.log(data);
        }
    },

    showBag() { //显示背包,将背包预制添加到画布下 注意未加载状态
        if (this.bagPrefab == null) {   //如果预制为空
            setTimeout(() => {  //延迟一段时间后再次执行该函数
                this.showBag();
            }, 500);
        }
        let node = cc.instantiate(this.bagPrefab);//拿到预制    实例化预制
        cc.find("Canvas").addChild(node);//将实例化后的预制（节点）添加到主画布
        node.opacity = 0;//透明度为0
        node.scale = 0.1;//缩放比例
        node.runAction(cc.spawn(//动画实现 渐入，缩放
            cc.fadeIn(0.5),
            cc.scaleTo(1, 1)
        ));
    },

    onClickStartButton() {//开始游戏
        this.over = false; //游戏结束标识
        this.playNode.active = false;//游戏开始按钮画面激活
        this.checkState = false;//检查碰撞状态
        this.gameOverNode.active = false;//游戏结束画面隐藏
        this.num = 0;//暂存分数
        this.power = 0;//力量
        this.scoreNode.getComponent(cc.Label).string = "" + this.num;//改变屏幕中的分数
        this.birdNode.y = 0;//重置小鸟的位置
        let list = this.pipeNode.children;
        for (let i = 0; i < list.length; i++) {//循环将所有的钢管组隐藏
            child = list[i];
            child.active = false;
        }
        cc.audioEngine.playMusic(this.clip[0], true);//播放背景音乐
    },

    gameOver() {//游戏结束
        this.over = true;//游戏结束标志
        this.gameOverNode.active = true;//游戏结束的画面激活
        this.playNode.active = true;//游戏开始的画面激活
        cc.audioEngine.stopMusic();//停止背景音乐
    },

    addScore() {//加分
        this.num++;//暂存分数加1
        this.scoreNode.getComponent(cc.Label).string = "" + this.num;//改变屏幕上的分数
        this.numNode.x = this.birdNode.x;
        this.numNode.y = this.birdNode.y;//将分数动画的位置与小鸟绑定
        this.numNode.opacity = 255;//将分数动画透明度设为255，用于之后的渐出动画
        this.numNode.runAction(//加分动画
            cc.spawn(//同步加载
                cc.fadeOut(0.5),//渐出
                cc.moveBy(0.5, cc.v2(0, 50))//移动动画
            )
        );
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //加载背包预制
        this.bagPrefab = null;//存储背包预制
        cc.loader.loadRes("prefab/bag", cc.Prefab, (err, data) => {//加载背包预制
            if (err) {//错误返回并打印
                cc.log(err);
                return;
            }
            this.bagPrefab = data;//保存加载的背包预制
        });
    },

    start() {
        this.over = true;//游戏结束标识
        this.checkState = false; //碰撞状态标识
        this.curFrame = 0; //小鸟图片下标标识
        this.num = 0; //分数暂存
        this.speed = 8;//游戏速度，
        this.power = 0;//力量

        this.clickLayerNode.on(cc.Node.EventType.TOUCH_START, () => {//点击屏幕事件
            this.power = 5;//上升力量设值
            cc.audioEngine.playEffect(this.clip[1]);//播放跳动音效
        });
    },

    update(dt) {
        if (this.over) {//判断游戏结束标识
            return;//结束return
        }

        this.power -= 0.2;//力量递减
        this.birdNode.y += this.power;//高度逐渐增加

        this.skyNode.x -= this.speed;//背景移动
        if (this.skyNode.x < -1200) {//判断背景是否移动到场景外
            this.skyNode.x = -10;//放到右侧
        }
        //钢管移动，碰撞判断
        let checkNode;
        let list = this.pipeNode.children;
        for (let i = 0; i < list.length; i++) {//循环所有钢管组
            child = list[i];
            child.x -= this.speed;//钢管移动
            if (child.x < -600) {//钢管移动到场景外
                child.x = 600;//
                child.active = true;
                child.y = Math.random() * 250 - 150;//随机钢管高度
            }
            let dis = Math.abs(child.x - this.birdNode.x);//此时钢管与小鸟的距离
            let w = this.birdNode.width / 2 + child.getChildByName("pipe1").width / 2;//钢管与小鸟的最大的距离
            if (dis <= w) {//钢管与小鸟的距离小于最大的距离，即x轴上开始有相交
                checkNode = child;//取出此时的钢管的数据
            }
        }
        if (checkNode) {//如果钢管有数据,就是开始了x轴的碰撞
            if (checkNode.active) { //判断钢管是否隐藏
                this.checkState = true;//将检测状态置为true
                let birdTop = this.birdNode.y + this.birdNode.height / 2;//小鸟的上部
                let birdBottom = this.birdNode.y - this.birdNode.height / 2;//小鸟的下部
                let pipeTop = checkNode.y + checkNode.getChildByName("pipe2").y - checkNode.getChildByName("pipe2").height / 2;//钢管的上部
                let pipeBottom = checkNode.y - checkNode.getChildByName("pipe2").y + checkNode.getChildByName("pipe2").height / 2;//钢管的下部
                if (birdTop >= pipeTop || birdBottom <= pipeBottom) {//如果小鸟的上部位置大于钢管的上部位置，如果小鸟的下部位置小于钢管的下部位置。
                    this.gameOver()//游戏结束
                }
            }
        } else {//无数据，即出钢管范围
            if (this.checkState) {//有检测状态 检测状态在加分时改变 穿过了钢管
                this.addScore();//加分
            }
            this.checkState = false;//检测状态置为false
        }
        if (this.birdNode.y < -cc.winSize.height / 2 || this.birdNode.y > cc.winSize.height / 2) {//上下边界判断
            this.gameOver();
        }

        this.birdNode.angle = this.power * this.speed;//小鸟的仰角

        this.curFrame++; //小鸟图片下标
        if (this.curFrame > 2) {//小鸟只有3张图
            this.curFrame = 0;//下标置零
        }
        if (this.power > 0) {//当存在向上的力时
            this.birdNode.getComponent(cc.Sprite).spriteFrame = this.birdSkinNode[this.curFrame];//播放小鸟飞的的动画
        }
    },
});
