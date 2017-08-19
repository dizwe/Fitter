var chartWidth       = 300,
    barHeight        = 25,
    groupHeight      = barHeight * data.series.length,
    gapBetweenGroups = 15,
    spaceForLabels   = 70,
    spaceRight   = 20;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}

// Color scale
function colores_google(n) {
  var colores_g = ["#FF834B","#8782B2","#fdae6b"];
  return colores_g[n % colores_g.length];
}

//except number which is zero and parameter 2
function Pram2Zero(value,index){
    return !(value===0 && index%3===2)
}

//ie T/F 리턴
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    // other browser
    return false;
}

var numNoZero = zippedData.filter(Pram2Zero).length

var chartHeight = barHeight * (numNoZero+2) + gapBetweenGroups * data.labels.length;

var x = d3.scale.linear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartWidth]);

var y = d3.scale.linear()
    .range([chartHeight-40 + gapBetweenGroups, 0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat('')
    .tickSize(0)
    .orient("left");

// Specify the chart area and dimensions
var widthSum = spaceForLabels + chartWidth + spaceRight;
var chartLegendHeight = chartHeight + barHeight*2;// legend 자리 만들어주기
var chart = d3.select("div.barChart")
            .append("svg")
            .attr("class","chart");

if(detectIE()){
    chart.attr("width", spaceForLabels + chartWidth)
          .attr("height", chartHeight);

}else{
    chart.attr("viewBox","0 0 "+widthSum+" "+chartLegendHeight)
}


// Create bars
var exceptZero =  0;
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
        if (Pram2Zero(d,i)){
            exceptZero = exceptZero+1;
        }
        //예상 칸은겹쳐서 하기 위해서 투명도는 fill-opcity
      return "translate(" + spaceForLabels + "," + (exceptZero * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { return colores_google(i%data.series.length);})
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1);

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) {
        if (d==0)
         return "";
        else
         return d; });

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    //옆에 라벨 중간에 두기
    .attr("y", function(d,i){
        if(typeof(data.labels[Math.floor(i/data.series.length)])==="object") //
            return 10
        else
            return 25;
    })
    .attr("dy", ".35em")
    .text(function(d,i) { // 이건 익명함수라 쓰고나면 안 데이터 기억 못 함
      if(typeof(data.labels[Math.floor(i/data.series.length)])==="object"){// 딱 한번 되는데
            var label = data.labels[Math.floor(i/data.series.length)][i % data.series.length];
            return label
      }else{
          if (i % data.series.length === 0)
            return data.labels[Math.floor(i/data.series.length)];
          else
            return ""
            }
      });

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", "+ 10 + ")")
      .call(yAxis);

// Draw legend
var legendRectSize = 18,
    legendSpacing  = 4;

var legend = chart.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups/2;
        var horz =  120 + i * 70;
        // 마지막 bar y 값에서 더 내리기
        var vert = ((exceptZero+4) * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length)));
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', function(d,i) { return colores_google(i%data.series.length);})
    .style('stroke', function(d,i) { return colores_google(i%data.series.length);});

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
            return d.label; });
    //if (Array.isArray(d)){
//                for (index in d){
//                    return d[index]
//                }
//            }else{


