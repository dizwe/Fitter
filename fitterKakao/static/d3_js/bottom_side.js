var tall = 500; //키기준
var broad = 250; //어깨기준
var real_tall = my['total_leg'];
var real_broad = my['thigh']*4;

var shape = d3.select("div.sideVisual")
            .append("svg")
            .attr("viewBox","0 -5 250 500")
//            .attr("width", broad)
//            .attr("height", tall);


//////////////////////////////////////// 상체 옆 /////////////////////////////////////////////////
var bottomSide = [
              // 바지도 무릎이면 무릎 두배로 되어있으므로 2를 나눠가진다고 생각해야함
              //바지 허리 0
              {x: myBottomSide['invisible_line'] - realBroadToRatio(myBottomSide['visual_waist']*2),
              y: realTallToRatio(my['total_leg'])},
              {x : myBottomSide['invisible_line'],
              y : realTallToRatio(my['total_leg'])},
              // 엉덩이 2
              {x: myBottomSide['invisible_line'] - realBroadToRatio(myBottomSide['visual_hip']*2), //앞부분에서 엉덩이 빼기
              y: realTallToRatio((my['total_leg']+my['crotch_height'])/2)},
              {x: myBottomSide['invisible_line'],
              y: realTallToRatio((my['total_leg']+my['crotch_height'])/2)},
              // 허벅지 4
              {x: myBottomSide['invisible_line'] - realBroadToRatio(my['thigh']*2),
              y: realTallToRatio(my['crotch_height'])},
              {x: myBottomSide['invisible_line'],
              y: realTallToRatio(my['crotch_height'])},
              // 중간 허벅지 6
              {x: myBottomSide['invisible_line'] - realBroadToRatio(my['middle_thigh']*2),
              y: realTallToRatio((my['crotch_height']+my['total_leg']/2)/2)},
              {x: myBottomSide['invisible_line'] ,
              y: realTallToRatio((my['crotch_height']+my['total_leg']/2)/2)},
              // 무릎 8
              {x: myBottomSide['invisible_line'] - realBroadToRatio(my['knee'])/5*9,
              y: realTallToRatio(my['total_leg']/2)},
              {x: myBottomSide['invisible_line'],
              y: realTallToRatio(my['total_leg']/2)},
              // 장딴지 10
              {x: myBottomSide['invisible_line'] - realBroadToRatio(my['calf'])*2,
              y: realTallToRatio(my['total_leg']/3)},
              {x: myBottomSide['invisible_line'] ,
              y: realTallToRatio(my['total_leg']/3)},
              // 발목 12
              {x: myBottomSide['invisible_line'] - realBroadToRatio(my['hem'])*2,
              y: realTallToRatio(my['total_leg']/11)},
              {x: myBottomSide['invisible_line'] ,
              y: realTallToRatio(my['total_leg']/11)},
              // 발 14
              {x: myBottomSide['invisible_line'] - realBroadToRatio(my['hem'])*2,
              y: realTallToRatio(20)},
              {x: myBottomSide['invisible_line'] + realBroadToRatio(my['hem'])*2,
              y: realTallToRatio(20)},
            ];


var bottomSideLinks = [
              //어깨
              {source : bottomSide[0], target : bottomSide[2]},
              {source : bottomSide[2], target : bottomSide[4]},
              {source : bottomSide[4], target : bottomSide[6]},
              {source : bottomSide[6], target : bottomSide[8]},
              {source : bottomSide[8], target : bottomSide[10]},
              {source : bottomSide[10], target : bottomSide[12]},
              {source : bottomSide[12], target : bottomSide[14]},
              {source : bottomSide[14], target : bottomSide[15]},
              {source : bottomSide[15], target : bottomSide[13]},
              {source : bottomSide[13], target : bottomSide[11]},
              {source : bottomSide[11], target : bottomSide[9]},
              {source : bottomSide[9], target : bottomSide[7]},
              {source : bottomSide[7], target : bottomSide[5]},
              {source : bottomSide[5], target : bottomSide[3]},
              {source : bottomSide[3], target : bottomSide[1]},
            ];

shape.selectAll("circle.bottomSide")
     .data(bottomSide)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; })
     .attr("r", "4px")
     .attr("fill", bodyColor);


shape.selectAll(".line")
     .data(bottomSideLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .attr("stroke-width", "3px")
     .style("stroke", bodyColor);

///////////////////////////////////////////////////옷 상체 옆 /////////////////////////////////////////

var bottomSideClo = [
                  //바지 허리 0
                  {x: myBottomSide['invisible_line'] - realBroadToRatio(myBottomSide['visual_waist']*2+botCal['bot_waist']),
                  y: realTallToRatio(my['total_leg'])},
                  {x : myBottomSide['invisible_line'] + realBroadToRatio(botCal['bot_waist']),
                  y : realTallToRatio(my['total_leg'])},
                  //// 엉덩이 2

                  {x: myBottomSide['invisible_line'] - realBroadToRatio(myBottomSide['visual_hip']*2+botCal['hip']), //앞부분에서 엉덩이 빼기
                  y: realTallToRatio((my['total_leg']+my['crotch_height'])/2)},
                  {x: myBottomSide['invisible_line'] - realBroadToRatio(myBottomSide['visual_hip']*2+botCal['hip']), //앞부분에서 엉덩이 빼기
                  y: realTallToRatio((my['total_leg']+my['crotch_height'])/2)},
                  // 허벅지 4
                  {x: myBottomSide['invisible_line'] - realBroadToRatio(my['thigh']*2+botCal['thigh']),
                  y: realTallToRatio(my['crotch_height'])},
                  {x: myBottomSide['invisible_line'] + realBroadToRatio(botCal['thigh']),
                  y: realTallToRatio(my['crotch_height'])},
                  // 발목 6 dynamic
                  {x: myBottomSide['invisible_line'] - realBroadToRatio(my['hem']*2+botCal['hem']/2*3),
                  y: realTallToRatio(my['total_leg']-pant['bot_length'])},
                  {x: myBottomSide['invisible_line'] + realBroadToRatio(botCal['hem']/2),
                  y: realTallToRatio(my['total_leg']-pant['bot_length'])},
                ];

var bottomClothesSideLinks = [
              {source : bottomSideClo[0], target : bottomSideClo[1]}, //
              {source : bottomSideClo[0], target : bottomSideClo[2]}, //
              {source : bottomSideClo[2], target : bottomSideClo[4]},
              {source : bottomSideClo[4], target : bottomSideClo[6]},
              {source : bottomSideClo[6], target : bottomSideClo[7]},
              {source : bottomSideClo[7], target : bottomSideClo[5]},
              {source : bottomSideClo[5], target : bottomSideClo[1]},
            ];


shape.selectAll("circle.pantSide")
    .data(bottomSideClo)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "5px")
    .attr("fill", clothes_color);


shape.selectAll(".line")
     .data(bottomClothesSideLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .attr("stroke-width", "3px")
     .style("stroke", clothes_color);