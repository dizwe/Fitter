var sideTall = 500; //키기준
var sideBroad = 300; //어깨기준
var real_sideTall = real_tall/2*10;
var real_sideBroad = suggest_body['chest'];

var shape = d3.select("div.sideVisual")
            .append("svg")
            .attr("viewBox","0 50 350 550");
//            .attr("width", sideBroad)
//            .attr("height", sideTall);


var myTopSide = {'base_up' : [sideBroad/3, realSideTallToRatio(real_sideTall)+100],
                 'base_middle' : [sideBroad/3, realSideTallToRatio(real_sideTall/5*4)+100],
                 'base_down' : [sideBroad/3, realSideTallToRatio(100)]};


var topCloCal = {'chest': (shirt['chest'] - my['chest_half']),
                'nipple': (shirt['chest'] - my['nipple_half']),
                'waist': (shirt['chest'] - my['waist_half'])};

function realSideTallToRatio(real_value){
  return sideTall - sideTall*real_value/real_sideTall;
}

function realSideBroadToRatio(real_value){
  return sideBroad * real_value/real_sideBroad;
}
//////////////////////////////////////// 상체 옆 /////////////////////////////////////////////////
var topSide = [
              // 가슴 0
              {x: myTopSide['base_up'][0],
              y: myTopSide['base_up'][1]},
              {x: myTopSide['base_up'][0] + realSideBroadToRatio(my['chest_half']),
              y: myTopSide['base_up'][1]},
              // 젖가슴 2
              {x: myTopSide['base_middle'][0] + realSideBroadToRatio(my['nipple_half']),
              y: myTopSide['base_middle'][1]},
              {x: myTopSide['base_middle'][0] + realSideBroadToRatio(my['nipple_half']),
              y: myTopSide['base_middle'][1]},
              //배 4
              {x: myTopSide['base_down'][0],
              y: myTopSide['base_down'][1]},
              {x: myTopSide['base_down'][0] + realSideBroadToRatio(my['waist_half']),
              y: myTopSide['base_down'][1]},
            ];


var topSideLinks = [
              {source : topSide[0], target : topSide[4]},
              {source : topSide[1], target : topSide[3]},
              {source : topSide[3], target : topSide[5]},
            ];

shape.selectAll("circle.bodySide")
     .data(topSide)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; })
     .attr("r", "4px")
     .attr("fill", bodyColor);

shape.selectAll(".line")
     .data(topSideLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .attr("stroke-width", "3px")
     .style("stroke", bodyColor);


/////////////////////////////////////////////////옷 상체 옆 /////////////////////////////////////////
console.log(topCloCal['chest'])
var topSideClo = [
              // 가슴 0
              {x: myTopSide['base_up'][0] - realSideBroadToRatio(topCloCal['chest']/2),
              y: myTopSide['base_up'][1]},
              {x: myTopSide['base_up'][0] + realSideBroadToRatio(my['chest_half']+topCloCal['chest']/2),
              y: myTopSide['base_up'][1]},
              // 젖가슴 2
              // 젖가슴에서 남는 양 더하고 + (등부분이 가슴 남는 양이니까) 더 많이 남는 젖가슴에서 가슴을 빼면 더 필요한 양 나옴
              {x: myTopSide['base_middle'][0] + realSideBroadToRatio(my['nipple_half']+topCloCal['nipple']/2+(topCloCal['nipple']/2-topCloCal['chest']/2)),
              y: myTopSide['base_middle'][1]},
              {x: myTopSide['base_middle'][0] + realSideBroadToRatio(my['nipple_half']+topCloCal['nipple']/2+(topCloCal['nipple']/2-topCloCal['chest']/2)),
              y: myTopSide['base_middle'][1]},
              //배 4
              {x: myTopSide['base_down'][0] - realSideBroadToRatio(topCloCal['chest']/2),
              y: myTopSide['base_down'][1]},
              {x: myTopSide['base_down'][0] + realSideBroadToRatio(my['waist_half']+topCloCal['waist']/2+(topCloCal['waist']/2-topCloCal['chest']/2)),
              y: myTopSide['base_down'][1]},
            ];

var topClothesSideLinks = [
              {source : topSideClo[0], target : topSideClo[4]},
              {source : topSideClo[1], target : topSideClo[3]},
              {source : topSideClo[3], target : topSideClo[5]},
            ];


shape.selectAll("circle.shirtSide")
    .data(topSideClo)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "5px")
    .attr("fill", clothes_color);


shape.selectAll(".line")
     .data(topClothesSideLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .attr("stroke-width", "3px")
     .style("stroke", clothes_color);
