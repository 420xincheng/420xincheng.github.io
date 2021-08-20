//立即执行函数，防止变量污染  (function(){})();
(function() {
    //step1 实例化对象
    let myChart = echarts.init(document.querySelector(".bar .chart"));

    //step2 指定配置项和数据
    var data = [];
    for (let i = 0; i < 5; ++i) {
        data.push(Math.round(Math.random() * 200));
    }

    option = {
        color: ['#9fe6b8', '#32c5e9'],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            }
        },
        textStyle: {
            fontSize: 12
        },

        xAxis: {
            max: 'dataMax',
            axisLabel: {
                color: "#fff"
            }
        },
        yAxis: {
            type: 'category',
            data: ['China', 'Amer', 'Japan', 'Asia', 'Era'],
            inverse: true,
            axisLabel: {
                color: "#fff"
            },
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 2 // only the largest 3 bars will be displayed
        },
        series: [{
            realtimeSort: true,
            name: '金牌',
            type: 'bar',
            data: data,
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            },
            barWidth: "30%",
            backgroundStyle: {
                barBorderRadius: 5,
                color: "#02a6b5"
            },
        }],
        grid: {
            left: "12%",
            top: 10,
            bottom: 20,

        },
        legend: {
            show: false
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
    };

    function run() {
        var data = option.series[0].data;
        for (var i = 0; i < data.length; ++i) {
            if (Math.random() > 0.9) {
                data[i] += Math.round(Math.random() * 2000);
            } else {
                data[i] += Math.round(Math.random() * 200);
            }
        }
        myChart.setOption(option);
    }
    window.addEventListener("resize", function() {
        myChart.resize();
    });
    setTimeout(function() {
        run();
    }, 0);
    setInterval(function() {
        run();
    }, 3000);

})();

// 柱状图2
(function() {
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    // 声明颜色数组
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    let option = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['2011年', '2012年']
        },
        grid: {
            left: '22%',
            right: '10%',
            bottom: '10%',
            // containLabel: true
        },
        xAxis: {
            show: false //不显示x轴刻度
        },
        yAxis: [{

                type: 'category',
                inverse: true,
                data: ['html', 'css', 'js', 'vue', 'node'],
                axisLine: { //不显示y轴线条
                    show: false
                },
                axisTick: {
                    show: false
                },
                // 刻度标签的文字颜色设置为白色
                axisLabel: {
                    color: "#fff"
                }
            },
            {
                inverse: true,
                show: true,
                // 不显示y轴线和刻度
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                // 将刻度标签文字设置为白色
                axisLabel: {
                    color: "#fff"
                },
                data: [702, 350, 610, 793, 664]
            }
        ],
        series: [{
                name: '条', //条，第一组
                type: 'bar',

                // 层级 相当于z-index
                yAxisIndex: 0,
                itemStyle: {
                    barBorderRadius: 20, //柱子的圆角
                    // 此时的color可以修改柱子的颜色
                    color: function(params) {
                        // params 传进来的是柱子的对象
                        // dataIndex 是当前柱子的索引号
                        // console.log(params);
                        return myColor[params.dataIndex];
                    }
                },
                barCategoryGap: 50, //柱子之间的距离
                barWidth: 10, //柱子宽度 
                //显示柱子内的文字
                data: [50, 66, 80, 10, 10],
                label: {
                    show: true,
                    //图形内显示
                    position: "inside",
                    //文字的显示格式，{c}是将data里面的数据展示出来
                    formatter: "{c}%"
                }
            },
            {
                name: '框',
                type: 'bar',
                barCategeoryGap: 50,
                // 层级 相当于z-index
                yAxisIndex: 1,
                barWidth: 15,
                itemStyle: {
                    barBorderRadius: 15, //柱子的圆角
                    borderColor: "#00c1de",
                    borderWidth: 2,
                    color: "none",

                },
                data: [100, 100, 100, 100, 100]
            }
        ]
    };
    window.addEventListener("resize", function() {
        myChart.resize();
    });
    myChart.setOption(option)
})();
//折线图1
(function() {
    var myChart = echarts.init(document.querySelector(".line .chart"));
    var yearData = [{
            year: "2020", // 年份
            data: [
                // 两个数组是因为有两条线
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ]
        },
        {
            year: "2021", // 年份
            data: [
                // 两个数组是因为有两条线
                [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
                [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
            ]
        }
    ];
    var option = {
        // 修改两条线的颜色
        color: ['#00f2f1', '#ed3f35'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // 当series 有name值时， legend 不需要写data
            // 修改图例组件文字颜色
            textStyle: {
                color: '#4c9bfd'
            },
            right: '10%',
        },
        grid: {
            top: "20%",
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            show: true, // 显示边框
            borderColor: '#012f4a' // 边框颜色
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false, // 去除轴间距
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            // 去除刻度线
            axisTick: {
                show: false
            },
            axisLabel: {
                color: "#4c9bfb" // x轴文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            }
        },
        yAxis: {
            type: 'value',
            // 去除刻度线
            axisTick: {
                show: false
            },
            axisLabel: {
                color: "#4c9bfb" // x轴文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
            splitLine: {
                lineStyle: {
                    color: "#012f4a"
                }
            }
        },
        series: [{
                type: 'line',
                smooth: true, // 圆滑的线
                name: '狂热粉丝',
                data: yearData[0].data[0]
            },
            {
                type: 'line',
                smooth: true, // 圆滑的线
                name: '观望者',
                data: yearData[0].data[1]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    })

    // 5.点击切换2020 和 2021 的数据
    $(".line h2").on("click", "a", function() {
        // alert(1);
        // console.log(yearData[$(this).index()]);
        var obj = yearData[$(this).index()];
        option.series[0].data = obj.data[0];
        option.series[1].data = obj.data[1];
        // 需要重新渲染
        myChart.setOption(option);
    })
})();
//折线图2
(function() {
    var myChart = echarts.init(document.querySelector(".line2 .chart"));
    var option = {

        tooltip: {
            trigger: 'axis'

        },
        legend: {
            data: ['邮件营销', '转发量'],
            top: "0%",
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        grid: {
            top: '30',
            left: '10',
            right: '30',
            bottom: '10',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
            // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.2)"
                }
            },
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"]
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                // 不显示刻度线
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
            // 修改分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,.1)"
                }
            }
        }],
        series: [{
                name: '邮件营销',
                type: 'line',
                smooth: true, // 圆滑的线
                // 单独修改当前线条的样式
                lineStyle: {
                    color: "#0184d5",
                    width: 1
                },
                // 填充区域
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1, [{
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
                            }
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)"
                },
                symbol: "circle", // 拐点设置为小圆点
                symbolSize: 5, // 设置拐点大小
                showSymbol: false, // 开始不显示拐点， 鼠标经过显示

                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 5
                },
                data: [30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40]
            },
            {
                name: "转发量",
                type: "line",
                smooth: true,
                lineStyle: {
                    normal: {
                        color: "#00d887",
                        width: 1
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1, [{
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                // 设置拐点 小圆点
                symbol: "circle",
                // 拐点大小
                symbolSize: 5,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#00d887",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 5
                },
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                data: [130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130, 20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();
//饼图
(function() {
    var myChart = echarts.init(document.querySelector(".pie .chart"));
    var option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '0%',
            left: 'center',
            // 小图标的宽度和高度
            itemWidth: 10,
            itemHeight: 10,
            // 修改图例组件的文字为 12px
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            // 修改饼形图大小，第一个为内圆半径，第二个为外圆半径
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 1.5
            },
            // 图形上的文字
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            // 链接文字和图形的线
            labelLine: {
                show: false
            },
            data: [{
                    value: 1,
                    name: "0岁以上"
                },
                {
                    value: 4,
                    name: "20-29岁"
                },
                {
                    value: 2,
                    name: "30-39岁"
                },
                {
                    value: 2,
                    name: "40-49岁"
                },
                {
                    value: 1,
                    name: "50岁以上"
                }
            ]
        }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();
//饼图2
(function() {
    var myChart = echarts.init(document.querySelector(".pie2 .chart"));
    var option = {
        color: ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        legend: {
            top: 'bottom',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: 10
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
            name: '地区分布',
            type: 'pie',
            radius: ["10%", "70%"],
            center: ['50%', '40%'],
            roseType: 'radius',
            itemStyle: {
                borderRadius: 3
            },
            // 图形的文字标签
            label: {
                fontsize: 10
            },
            // 引导线调整
            labelLine: {
                // 连接扇形图线长(斜线)
                length: 6,
                // 连接文字线长(横线)
                length2: 8
            },
            data: [{
                    value: 26,
                    name: '杭州'
                },
                {
                    value: 24,
                    name: '南京'
                },
                {
                    value: 25,
                    name: '长沙'
                },
                {
                    value: 20,
                    name: '武汉'
                },
                {
                    value: 25,
                    name: '上海'
                },
                {
                    value: 30,
                    name: '北京'
                },
                {
                    value: 42,
                    name: '深圳'
                }
            ]
        }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();
//模拟航线
(function() {
    var myChart = echarts.init(document.querySelector(".map .chart"));
    var geoCoordMap = {
        '上海': [121.4648, 31.2891],
        '东莞': [113.8953, 22.901],
        '东营': [118.7073, 37.5513],
        '中山': [113.4229, 22.478],
        '临汾': [111.4783, 36.1615],
        '临沂': [118.3118, 35.2936],
        '丹东': [124.541, 40.4242],
        '丽水': [119.5642, 28.1854],
        '乌鲁木齐': [87.9236, 43.5883],
        '佛山': [112.8955, 23.1097],
        '保定': [115.0488, 39.0948],
        '兰州': [103.5901, 36.3043],
        '包头': [110.3467, 41.4899],
        '北京': [116.4551, 40.2539],
        '北海': [109.314, 21.6211],
        '南京': [118.8062, 31.9208],
        '南宁': [108.479, 23.1152],
        '南昌': [116.0046, 28.6633],
        '南通': [121.1023, 32.1625],
        '厦门': [118.1689, 24.6478],
        '台州': [121.1353, 28.6688],
        '合肥': [117.29, 32.0581],
        '呼和浩特': [111.4124, 40.4901],
        '咸阳': [108.4131, 34.8706],
        '哈尔滨': [127.9688, 45.368],
        '唐山': [118.4766, 39.6826],
        '嘉兴': [120.9155, 30.6354],
        '大同': [113.7854, 39.8035],
        '大连': [122.2229, 39.4409],
        '天津': [117.4219, 39.4189],
        '太原': [112.3352, 37.9413],
        '威海': [121.9482, 37.1393],
        '宁波': [121.5967, 29.6466],
        '宝鸡': [107.1826, 34.3433],
        '宿迁': [118.5535, 33.7775],
        '常州': [119.4543, 31.5582],
        '广州': [113.5107, 23.2196],
        '廊坊': [116.521, 39.0509],
        '延安': [109.1052, 36.4252],
        '张家口': [115.1477, 40.8527],
        '徐州': [117.5208, 34.3268],
        '德州': [116.6858, 37.2107],
        '惠州': [114.6204, 23.1647],
        '成都': [103.9526, 30.7617],
        '扬州': [119.4653, 32.8162],
        '承德': [117.5757, 41.4075],
        '拉萨': [91.1865, 30.1465],
        '无锡': [120.3442, 31.5527],
        '日照': [119.2786, 35.5023],
        '昆明': [102.9199, 25.4663],
        '杭州': [119.5313, 29.8773],
        '枣庄': [117.323, 34.8926],
        '柳州': [109.3799, 24.9774],
        '株洲': [113.5327, 27.0319],
        '武汉': [114.3896, 30.6628],
        '汕头': [117.1692, 23.3405],
        '江门': [112.6318, 22.1484],
        '沈阳': [123.1238, 42.1216],
        '沧州': [116.8286, 38.2104],
        '河源': [114.917, 23.9722],
        '泉州': [118.3228, 25.1147],
        '泰安': [117.0264, 36.0516],
        '泰州': [120.0586, 32.5525],
        '济南': [117.1582, 36.8701],
        '济宁': [116.8286, 35.3375],
        '海口': [110.3893, 19.8516],
        '淄博': [118.0371, 36.6064],
        '淮安': [118.927, 33.4039],
        '深圳': [114.5435, 22.5439],
        '清远': [112.9175, 24.3292],
        '温州': [120.498, 27.8119],
        '渭南': [109.7864, 35.0299],
        '湖州': [119.8608, 30.7782],
        '湘潭': [112.5439, 27.7075],
        '滨州': [117.8174, 37.4963],
        '潍坊': [119.0918, 36.524],
        '烟台': [120.7397, 37.5128],
        '玉溪': [101.9312, 23.8898],
        '珠海': [113.7305, 22.1155],
        '盐城': [120.2234, 33.5577],
        '盘锦': [121.9482, 41.0449],
        '石家庄': [114.4995, 38.1006],
        '福州': [119.4543, 25.9222],
        '秦皇岛': [119.2126, 40.0232],
        '绍兴': [120.564, 29.7565],
        '聊城': [115.9167, 36.4032],
        '肇庆': [112.1265, 23.5822],
        '舟山': [122.2559, 30.2234],
        '苏州': [120.6519, 31.3989],
        '莱芜': [117.6526, 36.2714],
        '菏泽': [115.6201, 35.2057],
        '营口': [122.4316, 40.4297],
        '葫芦岛': [120.1575, 40.578],
        '衡水': [115.8838, 37.7161],
        '衢州': [118.6853, 28.8666],
        '西宁': [101.4038, 36.8207],
        '西安': [109.1162, 34.2004],
        '贵阳': [106.6992, 26.7682],
        '连云港': [119.1248, 34.552],
        '邢台': [114.8071, 37.2821],
        '邯郸': [114.4775, 36.535],
        '郑州': [113.4668, 34.6234],
        '鄂尔多斯': [108.9734, 39.2487],
        '重庆': [107.7539, 30.1904],
        '金华': [120.0037, 29.1028],
        '铜川': [109.0393, 35.1947],
        '银川': [106.3586, 38.1775],
        '镇江': [119.4763, 31.9702],
        '长春': [125.8154, 44.2584],
        '长沙': [113.0823, 28.2568],
        '长治': [112.8625, 36.4746],
        '阳泉': [113.4778, 38.0951],
        '青岛': [120.4651, 36.3373],
        '韶关': [113.7964, 24.7028]
    };

    var XAData = [
        [{
            name: '长沙'
        }, {
            name: '北京',
            value: 100
        }],
        [{
            name: '长沙'
        }, {
            name: '上海',
            value: 100
        }],
        [{
            name: '长沙'
        }, {
            name: '广州',
            value: 100
        }],
        [{
            name: '长沙'
        }, {
            name: '西宁',
            value: 100
        }],
        [{
            name: '长沙'
        }, {
            name: '银川',
            value: 100
        }]
    ];

    var XNData = [
        [{
            name: '北京'
        }, {
            name: '西宁',
            value: 100
        }],
        [{
            name: '北京'
        }, {
            name: '上海',
            value: 100
        }],
        [{
            name: '北京'
        }, {
            name: '广州',
            value: 100
        }],
        [{
            name: '北京'
        }, {
            name: '西安',
            value: 100
        }],
        [{
            name: '北京'
        }, {
            name: '武汉',
            value: 100
        }],
        [{
            name: '北京'
        }, {
            name: '西宁',
            value: 100
        }],
        [{
            name: '北京'
        }, {
            name: '哈尔滨',
            value: 100
        }],
        [{
            name: '北京'
        }, {
            name: '乌鲁木齐',
            value: 100
        }],
        [{
            name: '北京'
        }, {
            name: '银川',
            value: 100
        }]
    ];

    var YCData = [
        [{
            name: '深圳'
        }, {
            name: '北京',
            value: 100
        }],
        [{
            name: '深圳'
        }, {
            name: '广州',
            value: 100
        }],
        [{
            name: '深圳'
        }, {
            name: '上海',
            value: 100
        }],
        [{
            name: '深圳'
        }, {
            name: '西安',
            value: 100
        }],
        [{
            name: '深圳'
        }, {
            name: '西宁',
            value: 100
        }],
    ];

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    //var planePath = 'arrow';
    var convertData = function(data) {

        var res = [];
        for (var i = 0; i < data.length; i++) {

            var dataItem = data[i];

            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value
                });
            }
        }
        return res;

    };

    var color = ['#a6c84c', '#ffa022', '#46bee9']; //航线的颜色
    var series = [];
    [
        ['长沙', XAData],
        ['北京', XNData],
        ['深圳', YCData]
    ].forEach(function(item, i) {
        series.push({
            name: item[0] + ' Top1',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: 'red', //arrow箭头的颜色
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top2',
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'],
            symbolSize: 10,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        }, {
            name: item[0] + ' Top3',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function(val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[i],
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            data: item[1].map(function(dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            })
        });
    });
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params, ticket, callback) {
                if (params.seriesType == "effectScatter") {
                    return "线路：" + params.data.name + "" + params.data.value[2];
                } else if (params.seriesType == "lines") {
                    return params.data.fromName + ">" + params.data.toName + "<br />" + params.data.value;
                } else {
                    return params.name;
                }
            }
        },
        legend: {
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            data: ['长沙 Top1', '北京 Top2', '深圳 Top3'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'multiple'
        },
        geo: {
            map: 'china',
            // 把地图放大1.2倍
            zoom: 1.2,
            label: {
                // 鼠标移动显示区域名称
                emphasis: {
                    show: true,
                    color: '#fff'
                }
            },
            roam: true,
            // 地图样式修改
            itemStyle: {
                normal: {
                    areaColor: 'rgba(34, 70, 168, 0.8)',
                    borderColor: '#0692a4'
                },
                emphasis: {
                    areaColor: 'rgba(119, 139, 224, 0.548)'
                }
            }
        },
        series: series
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    })
})();