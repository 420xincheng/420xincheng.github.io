// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView //滚动条
    },

    initBag() {
        if (this.dataPrefab == null) {
            setTimeout(() => {
                this.initBag();
            }, 500)
            return;
        }
        for (let i = 0; i < 21; i++) {
            let node = cc.instantiate(this.dataPrefab);
            this.scrollView.content.addChild(node);
            node.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = this.spList[i];
            node.on(cc.Node.EventType.TOUCH_END, (event) => {
                this.onClick(event);
            });
        }
    },

    onClick(event) {
        if (this.oldSelect) {
            this.oldSelect.getChildByName("select").active = false;
            this.oldSelect = event.target;
        }
        event.target.getChildByName("select").active = true;
        this.oldSelect = event.target;
    },

    onClickButton(event, data) {
        //点击函数，绑定点击关闭按钮
        if (data == 'close') {
            this.node.active = false;
        }
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.dataPrefab = null;
        cc.loader.loadRes("prefeb/data", cc.Prefab, (err, data) => {
            if (err) {
                cc.log(err);
                return;
            }
            this.dataPrefab = data;
        });
        this.spList = [];
        for (let i = 1; i <= 21; i++) {
            cc.loader.loadRes("textrue/" + i, cc.SpriteFrame, (err, data) => {
                if (err) {
                    return;
                }
                this.spList.push(data);
            });
        }
    },

    start() {
        this.initBag();
        this.oldSelect = null;
    },

    // update (dt) {},
});