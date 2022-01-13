// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        let game = cc.find("Canvas/game") //找到脚本
        this.script = game.getComponent("game") //脚本位置
    },

    onCollisionEnter(other, self) {
        if (other.tag == 1) {
            // 判断碰撞返回值，调用不同的方法
            this.script.addScore();
        } else if (other.tag == 0) {
            this.script.gameOver();
        }
    }
    // update (dt) {},
});