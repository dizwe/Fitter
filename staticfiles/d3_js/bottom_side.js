var tall = 700; //키기준
var broad = 300; //어깨기준
var real_tall = my['total_leg'];
var real_broad = my['thigh']*4;

var shape = d3.select("body")
            .append("svg")
            .attr("width", broad)
            .attr("height", tall);


var myBottomSide = {'visual_waist':my['bottom_waist']/3*2, // thigh랑 길이가 비슷해지면 되는데 thigh랑 비슷하게 만들면 됨
                    'visual_hip':my['hip']/17*11,
                    'visual_pant_waist':pant['waist']/3*2};


//////////////////////////////////////// 상체 옆 /////////////////////////////////////////////////
var bottomSide = [
              //바지 허리
              {x: broad/2 - realBroadToRatio(myBottomSide['visual_waist']),
              y: realTallToRatio(my['total_leg'])},
              {x : broad/2 + realBroadToRatio(myBottomSide['visual_waist']),
              y : realTallToRatio(my['total_leg'])},
              // 엉덩이
              {x: broad/2 + realBroadToRatio(myBottomSide['visual_waist'])
                  -realBroadToRatio(myBottomSide['visual_hip']*2), //앞부분에서 엉덩이 빼기
              y: realTallToRatio((my['total_leg']+my['crotch_height'])/2)},
              {x: broad/2 + realBroadToRatio(myBottomSide['visual_waist']),
              y: realTallToRatio((my['total_leg']+my['crotch_height'])/2)},
              // 허벅지
              {x: broad/2 - realBroadToRatio(my['thigh']),
              y: realTallToRatio(my['crotch_height'])},
              {x: broad/2 + realBroadToRatio(my['thigh']),
              y: realTallToRatio(my['crotch_height'])},
              // 중간 허벅지
              {x: broad/2 - realBroadToRatio(my['middle_thigh']),
              y: realTallToRatio((my['crotch_height']+my['total_leg']/2)/2)},
              {x: broad/2 + realBroadToRatio(my['middle_thigh']),
              y: realTallToRatio((my['crotch_height']+my['total_leg']/2)/2)},
              // 무릎
              {x: broad/2 - realBroadToRatio(my['knee']),
              y: realTallToRatio(my['total_leg']/2)},
              {x: broad/2 + realBroadToRatio(my['knee']),
              y: realTallToRatio(my['total_leg']/2)},
              // 장딴지
              {x: broad/2 - realBroadToRatio(my['calf']),
              y: realTallToRatio(my['total_leg']/3)},
              {x: broad/2 + realBroadToRatio(my['calf']),
              y: realTallToRatio(my['total_leg']/3)},
              // 발목
              {x: broad/2 - realBroadToRatio(my['hem']),
              y: realTallToRatio(my['total_leg']/11)},
              {x: broad/2 + realBroadToRatio(my['hem']),
              y: realTallToRatio(my['total_leg']/11)},
            ];

//var topSideLinks = [
//              {source : topSide[0], target : topSide[1]},
//              {source : topSide[2], target : topSide[3]},
//            ];

shape.selectAll("circle.bottomSide")
     .data(bottomSide)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; })
     .attr("r", "5px")
     .attr("fill", "grey");

//shape.selectAll(".line")
//     .data(topSideLinks)
//     .enter()
//     .append("line")
//     .attr("x1", function(d) { return d.source.x })
//     .attr("y1", function(d) { return d.source.y })
//     .attr("x2", function(d) { return d.target.x })
//     .attr("y2", function(d) { return d.target.y })
//     .style("stroke", "rgb(6,120,155)");


///////////////////////////////////////////////////옷 상체 옆 /////////////////////////////////////////
var bottomSideClo = [
                  //바지 허리 0
                  {x: broad/2 - realBroadToRatio(myBottomSide['visual_pant_waist']),
                  y: realTallToRatio(my['total_leg'])},
                  {x : broad/2 + realBroadToRatio(myBottomSide['visual_pant_waist']),
                  y : realTallToRatio(my['total_leg'])},
                  // 허벅지 2
                  {x: broad/2 - realBroadToRatio(pant['thigh']),
                  y: realTallToRatio(my['crotch_height'])},
                  {x: broad/2 + realBroadToRatio(pant['thigh']),
                  y: realTallToRatio(my['crotch_height'])},
                  // 발목 4
                  {x: broad/2 - realBroadToRatio(pant['hem']),
                  y: realTallToRatio(my['total_leg']-pant['length'])},
                  {x: broad/2 + realBroadToRatio(pant['hem']),
                  y: realTallToRatio(my['total_leg']-pant['length'])},
                ];

var bottomClothesSideLinks = [
              {source : bottomSideClo[0], target : bottomSideClo[2]}, //
              {source : bottomSideClo[0], target : bottomSideClo[2]},
              {source : bottomSideClo[2], target : bottomSideClo[4]},
              {source : bottomSideClo[4], target : bottomSideClo[5]},
              {source : bottomSideClo[5], target : bottomSideClo[3]},
              {source : bottomSideClo[3], target : bottomSideClo[1]},
            ];


shape.selectAll("circle.pantSide")
    .data(bottomSideClo)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "5px")
    .attr("fill", "red");


shape.selectAll(".line")
     .data(bottomClothesSideLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .style("stroke", "rgb(200,29,155)");