var tall = 500; //키기준
var broad = 300; //어깨기준
var real_tall = real_tall/2*10;
var real_broad = suggest_body['chest']*2;

var shape = d3.select("body")
            .append("svg")
            .attr("width", broad)
            .attr("height", tall);


var myTopSide = {'base_up' : [10, 10],
                 'base_down' : [10, realTallToRatio(tall)]};


//////////////////////////////////////// 상체 옆 /////////////////////////////////////////////////
var topSide = [
              //기본  base
              {x: myTopSide['base_up'][0],
              y: myTopSide['base_up'][1]},//기장 오른쪽
              {x : myTopSide['base_down'][0],
              y : myTopSide['base_down'][1]},
              // 가슴 윗부분
              {x: myTopSide['base_up'][0] + realBroadToRatio(suggest_body['chest']/2),
              y: myTopSide['base_up'][1]},//기장 오른쪽
              {x: myTopSide['base_down'][0] + realBroadToRatio(suggest_body['waist']/2),
              y: myTopSide['base_down'][1]},//기장 오른쪽
            ];

var topSideLinks = [
              {source : topSide[0], target : topSide[1]},
              {source : topSide[2], target : topSide[3]},
            ];

shape.selectAll("circle.bodySide")
     .data(topSide)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; })
     .attr("r", "5px")
     .attr("fill", "grey");

shape.selectAll(".line")
     .data(topSideLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .style("stroke", "rgb(6,120,155)");


/////////////////////////////////////////////////옷 상체 옆 /////////////////////////////////////////
var topSideClo = [
              //기본  base
              {x: myTopSide['base_up'][0],
              y: myTopSide['base_up'][1]},//기장 오른쪽
              {x : myTopSide['base_down'][0],
              y : myTopSide['base_down'][1]},
              // 가슴 윗부분
              {x: myTopSide['base_up'][0] + realBroadToRatio(shirt['chest']),
              y: myTopSide['base_up'][1]},//기장 오른쪽
              {x: myTopSide['base_down'][0] + realBroadToRatio(shirt['chest']),
              y: myTopSide['base_down'][1]},//기장 오른쪽
            ];

var topClothesSideLinks = [
              {source : topSideClo[0], target : topSideClo[1]},
              {source : topSideClo[2], target : topSideClo[3]},
            ];


shape.selectAll("circle.shirtSide")
    .data(topSideClo)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "5px")
    .attr("fill", "red");


shape.selectAll(".line")
     .data(topClothesSideLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .style("stroke", "rgb(200,29,155)");
