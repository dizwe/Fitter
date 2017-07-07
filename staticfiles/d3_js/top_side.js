var sideTall = 500; //키기준
var sideBroad = 300; //어깨기준
var real_sideTall = real_tall/2*10;
var real_sideBroad = suggest_body['chest']*2;

var shape = d3.select("body")
            .append("svg")
            .attr("width", sideBroad)
            .attr("height", sideTall);


var myTopSide = {'base_up' : [10, realSideTallToRatio(real_sideTall)],
                 'base_middle' : [10, realSideTallToRatio(real_sideTall/5*4)],
                 'base_down' : [10, realSideTallToRatio(10)]};

function realSideTallToRatio(real_value){
  return sideTall- sideTall*real_value/real_sideTall;
}

function realSideBroadToRatio(real_value){
  return sideBroad * real_value/real_sideBroad;
}
//////////////////////////////////////// 상체 옆 /////////////////////////////////////////////////
var topSide = [
              //기본  base
              {x: myTopSide['base_up'][0],
              y: myTopSide['base_up'][1]},//기장 오른쪽
              {x : myTopSide['base_down'][0],
              y : myTopSide['base_down'][1]},
              // 가슴 윗부분
              {x: myTopSide['base_up'][0] + realSideBroadToRatio(suggest_body['chest']/2),
              y: myTopSide['base_up'][1]},//기장 오른쪽
              //배 윗부분
              {x: myTopSide['base_down'][0] + realSideBroadToRatio(suggest_body['waist']/2),
              y: myTopSide['base_down'][1]},//기장 오른쪽
              // 젖가슴 윗부분
              {x: myTopSide['base_middle'][0] + realSideBroadToRatio(suggest_body['nipple']/2),
              y: myTopSide['base_middle'][1]},
            ];
console.log(suggest_body['nipple']);
var topSideLinks = [
              {source : topSide[0], target : topSide[1]},
              {source : topSide[2], target : topSide[4]},
              {source : topSide[4], target : topSide[3]},
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
              {x: myTopSide['base_up'][0] + realSideBroadToRatio(shirt['chest']),
              y: myTopSide['base_up'][1]},//기장 오른쪽
              {x: myTopSide['base_down'][0] + realSideBroadToRatio(shirt['chest']),
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
