// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('cpu_percent'));
var data = [];
var option = {
    title: {
        text: '树莓派的CPU占用率'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '树莓派的CPU占用率',
        type: 'line',
        showSymbol: false,
        hoverAnimation: true,
        data: data
    }]
};

setInterval(function() {
    $.get("cmd", function(result) {
        console.log(result);
	var cpu_state = JSON.parse(result);
        var now = new Date();
        var current = {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                cpu_state.percent
            ]
        };
        //data.shift();
        data.push(current);

        myChart.setOption({
            series: [{
                data: data
            }]
        });
    });
}, 1000);

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
