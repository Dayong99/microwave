class sameTime_diffHeight_tempTrend {
    constructor() {
        this.tempL_MW = []
        this.heightL_MW = []
        this.tempL_LC = []
        this.heightL_LC = []

        this.maxHeight = 40
        this.intervHeight = 2.5;

        this.minTemp = -90
        this.maxTemp = 50
        this.intervTemp = 5
    }

    init_chart(params) {
        let el = !(params.el === undefined) ? (params.el) : 'body'
        let chartTop = !(params.top === undefined) ? parseInt(params.top) : 75
        let chartLeft = !(params.left === undefined) ? parseInt(params.left) : 350
        let chartZIndex = !(params.zIndex === undefined) ? parseInt(params.zIndex) : 10
        let chartWidth = !(params.width === undefined) ? parseInt(params.width) : 450
        let chartHeight = !(params.height === undefined) ? parseInt(params.height) : 300
        this._load_chartBase(chartTop, chartLeft, chartZIndex, chartWidth, chartHeight, el)
    }

    asyncGetData(url) {
        return new Promise((resolve2, reject2) => {
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                timeout: 1000,
                // complete: ((obj, status) => { if (status != 'error') { resolve2(obj.responseJSON) } else { resolve2({}) } })
                success: (res => resolve2(res)),
                error: ((obj, status, err) => resolve2({ 'data': null }))
            })
        })
    }

    update_data(updateParams) {
        this.timeStrMW = updateParams.timeMW
        this.timeStrLC = updateParams.timeLC
        this.stationMW = String(updateParams.stationMW)
        this.stationLC = String(updateParams.stationLC)
        this.heightL = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75, 10]

        var urlMW = 'http://192.168.1.2:8301/convection/api/weibostation/shows?time=' + this.timeStrMW + '&zhanhao=' + this.stationMW
        var urlLC = 'http://192.168.1.2:8301/convection/api/lbostation/data?time=' + this.timeStrLC + '&zhanhao=' + this.stationLC
        console.log('TWO URLs', urlMW, urlLC)
        var promises1 = [this.asyncGetData(urlMW), this.asyncGetData(urlLC)]
        Promise.all(promises1)
            .then(result => this._draw(result))
    }

    // _format_time(t) {
    //     let year = t.getUTCFullYear()
    //     let month = t.getUTCMonth()
    //     let date = t.getUTCDate()

    //     let year4 = year.toString()
    //     let month2 = ('0' + (month + 1).toString()).slice(-2)
    //     let date2 = ('0' + date.toString()).slice(-2)

    //     this.formattedDate = year4 + month2 + date2
    //     this.dateObj = new Date(Date.UTC(year, month, date))
    // }

    // _get_seq_time() {
    //     let secSeq = (this.timeObj - this.dateObj) / 1000
    //     return this.timeL.indexOf(String(secSeq))
    // }

    _load_chartBase(top, left, zIndex, width, height, el) {
        // create SVG chart container
        var chartWidth = width,
            chartHeight = height,
            leftPadding = 60,
            rightPadding = 10,
            topPadding = 75,
            bottomPadding = 40,
            chartInnerWidth = width - leftPadding - rightPadding,
            chartInnerHeight = height - topPadding - bottomPadding
        this.chartInnerWidth = chartInnerWidth
        this.chartInnerHeight = chartInnerHeight
        let translate = "translate(" + leftPadding + "," + topPadding + ")";

        // CREATE SAME-TIME CHART 1
        console.log(el)
        d3.select(el).selectAll("svg").remove(); 
        var chart1st = d3
            .select(el)
            .append("svg")
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("class", "chart")
            .attr("id", "temp_singleTime_chart1")
            .attr(
                "style",
                "position:absolute; top:" + top + 'px;left:' + left + 'px;z-index:' + zIndex
            );

        //create a rectangle for chart background fill
        var background_chart1st = chart1st
            .append("rect")
            .attr("id", "chart1stBackground")
            .attr("width", chartInnerWidth)
            .attr("height", chartInnerHeight)
            .attr("transform", translate)
            .attr("style", "fill: rgba(58,58,58,.2)");

        // create ticks
        var yScale1st = d3
            .scaleLinear()
            .range([0, chartInnerHeight])
            .domain([this.maxHeight, 0.0]);
        let yTicks = []
        for (let i = 0; i <= this.maxHeight; i += this.intervHeight) {
            yTicks.push(i)
        }
        var yAxis1st_tick = d3
            .axisLeft(yScale1st)
            .tickValues(yTicks) //[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10])
            .tickFormat(d3.format(",.01f"));
        var yAxis1st = chart1st
            .append("g")
            .attr("class", "axis1st")
            .attr("transform", translate)
            .call(yAxis1st_tick);
        chart1st
            .append("text")
            .attr("class", "axisLabel_chart1st")
            .attr("style", "transform:translate(15px," + (topPadding + chartInnerHeight / 2 + 40) + "px) rotateZ(270deg)")
            .text("高度（km）");
        chart1st
            .append("text")
            .attr("class", "axisLabel_chart1st")
            .attr("style", "transform:translate(" + (leftPadding + chartInnerWidth / 2 - 40) + 'px,' + (chartHeight - 5) + 'px)')
            .text("温度（℃）");
        this.titleMain = chart1st
            .append("text")
            .attr("class", "title_chart1st")
            .attr('id', 'title-name')
            .attr('font-weight', 'bold')
            .attr('x', leftPadding + chartInnerWidth / 2 - 175)
            .attr('y', 20)
            .text("微波辐射计、L波段同一时刻不同高度温度变化曲线");
        this.titleMW = chart1st
            .append("text")
            .attr("class", "title_chart1st")
            .attr('id', 'titleMW')
            .attr('x', leftPadding + chartInnerWidth / 2 - 175)
            .attr('y', 43)
        this.titleLC = chart1st
            .append("text")
            .attr("class", "title_chart1st")
            .attr('id', 'titleLC')
            .attr('x', leftPadding + chartInnerWidth / 2 - 175)
            .attr('y', 66)
        var xScale1st = d3
            .scaleLinear()
            .range([0, chartInnerWidth])
            .domain([-90, 50]);

        var xAxis1st_tick = d3.axisBottom(xScale1st).scale(xScale1st);

        var xAxis1st = chart1st
            .append("g")
            .attr("class", "axis1st")
            .attr("transform", this._translate22(chartInnerHeight, leftPadding, topPadding))
            .call(xAxis1st_tick);

        var chart1_gridH = chart1st
            .selectAll()
            .data(yTicks)
            .enter()
            .append("line")
            .attr("class", "chart1st_gridH")
            .attr("x1", 0)
            .attr("x2", chartInnerWidth)
            .attr("y1", d => {
                return ((this.maxHeight - d) / this.maxHeight) * chartInnerHeight;
            })
            .attr("y2", d => {
                return ((this.maxHeight - d) / this.maxHeight) * chartInnerHeight;
            })
            .style("stroke", function (d, i) {
                if (i % 2 == 1) {
                    return "#a4a4a4";
                } else {
                    return "#5a5a5a";
                }
            })
            .style("stroke-width", "1px")
            .attr("transform", translate);
        let xTicks = []
        for (let i = this.minTemp; i < this.maxTemp; i += this.intervTemp) {
            xTicks.push(i)
        }
        var chart1_gridT = chart1st
            .selectAll()
            .data(xTicks)
            .enter()
            .append("line")
            .attr("class", "chart1st_gridT")
            .attr("y1", 0)
            .attr("y2", chartInnerHeight)
            .attr("x1", d => {
                return ((this.maxTemp - d) / 140) * chartInnerWidth;
            })
            .attr("x2", d => {
                return ((this.maxTemp - d) / 140) * chartInnerWidth;
            })
            .style("stroke", function (d, i) {
                if (d == -40) {
                    return "#000000";
                } else if (i % 2 == 1) {
                    return "#a4a4a4";
                } else {
                    return "#5a5a5a";
                }
            })
            .style("stroke-width", function (d, i) {
                if (d == -40) {
                    return "2px";
                } else {
                    return "0.8px";
                }
            })
            .attr("transform", translate);

        this.pllMW = chart1st
            .append("polyline")
            .attr("id", "pointsMW")
            .attr("stroke", "#ff6010")
            .attr("fill", "none")
            .attr("transform", translate);
        this.pllLC = chart1st
            .append("polyline")
            .attr("id", "pointsLC")
            .attr("stroke", "#90ff10")
            .attr("fill", "none")
            .attr("transform", translate);
        return
    }
    _translate22(chartInnerHeight, leftPadding, topPadding) {
        return (
            "translate(" +
            leftPadding +
            "," +
            (this.chartInnerHeight + topPadding) +
            ")"
        );
    }

    _draw(allDataThisTime) {
        console.log(allDataThisTime)
        this.tempL_MW = []
        this.heightL_MW = []
        this.tempL_LC = []
        this.heightL_LC = []
        var dataMW = allDataThisTime[0]
        var dataLC = allDataThisTime[1]

        this.mainTitleLenth = this.titleMain._groups[0][0].textLength.baseVal.value

        if (dataMW.data != null) {
            this.titleMW.text('微波辐射计时间：' + this.timeStrMW + '；站号：' + this.stationMW)
            this.centerTitleMW()

            this.tempL_MW = dataMW.data.data.split(',').slice(0, -1)
            this.heightL_MW = dataMW.data.heightList.split(',')
            let polyline_pts = "";
            let dataCount = this.tempL_MW.length
            let x = 0; let y = 0; let thisPt = ''
            for (let i = 0; i < dataCount; i++) {
                x = (this.tempL_MW[i] - 273.15 + 90) / 140 * this.chartInnerWidth
                y = (40 - this.heightL_MW[i]) / 40 * this.chartInnerHeight
                thisPt = x + "," + y + ' ';
                polyline_pts += thisPt
            }
            this.pllMW.attr("points", polyline_pts);
        } else {
            this.titleMW.text('无微波辐射计数据')
            this.centerTitleMW()
        }

        if (dataLC.data != null) {
            this.titleLC.text('L波段时间：' + this.timeStrLC + '；站号：' + this.stationLC)
            this.centerTitleLC()

            for (let i = 0; i < dataLC.data.data.TEMP.length; i++) {
                if (dataLC.data.data.HEIGHT[i] == '-9999') break
                if (dataLC.data.data.TEMP[i] != '-9999'
                    && !isNaN(parseFloat(dataLC.data.data.TEMP[i]))
                    && !isNaN(parseFloat(dataLC.data.data.HEIGHT[i]))) {
                    if ((dataLC.data.data.HEIGHT[i]).includes('.')) {
                        this.heightL_LC.push(parseFloat(dataLC.data.data.HEIGHT[i]) * 1000)
                    } else {
                        this.heightL_LC.push(parseFloat(dataLC.data.data.HEIGHT[i]))
                    }
                    this.tempL_LC.push(parseFloat(dataLC.data.data.TEMP[i]))
                }
            }
            // let [cur1, cur2] = [-999999, 999999]
            // for (let num of this.tempL_LC) {
            //     if (num > cur1) {
            //         cur1 = num;
            //     }
            //     if (num < cur2) {
            //         cur2 = num
            //     }
            // }
            // console.log(cur1, cur2)
            // console.log(Math.max(this.tempL_LC), this.tempL_LC, this.tempL_MW)
            // console.log(this.heightL_LC, this.heightL_MW)
            let polyline_pts = "";
            let dataCount = this.tempL_LC.length
            let x = 0; let y = 0; let thisPt = ''
            for (let i = 0; i < dataCount; i++) {
                x = (this.tempL_LC[i] + 90) / 140 * this.chartInnerWidth
                y = (40000 - this.heightL_LC[i]) / 40000 * this.chartInnerHeight
                thisPt = x + "," + y + ' ';
                polyline_pts += thisPt
            }
            this.pllLC.attr("points", polyline_pts);
        } else {
            this.titleLC.text('无L波段数据')
            this.centerTitleLC()
        }
    }
    centerTitleMW() {
        let titleMWLength = this.titleMW._groups[0][0].textLength.baseVal.value
        var transX = (-titleMWLength + this.mainTitleLenth) / 2
        this.titleMW.attr('transform', 'translate(' + transX + ',0)')
    }
    centerTitleLC() {
        let titleLCLength = this.titleLC._groups[0][0].textLength.baseVal.value
        let transX = (-titleLCLength + this.mainTitleLenth) / 2
        this.titleLC.attr('transform', 'translate(' + transX + ',0)')
    }
}

export { sameTime_diffHeight_tempTrend as Sdt }