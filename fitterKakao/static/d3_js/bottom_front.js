var tall = 500; //키기준
var broad = 250; //어깨기준
var real_tall = real_tall/2
var real_broad = suggest_body['shoulder'];

var shape = d3.select("div.frontVisual")
            .append("svg")
            .attr("viewBox","0 0 250 500")
//            .attr("width", broad)
//            .attr("height", tall);

function realTallToRatio(real_value){
    return tall- tall*real_value/real_tall;
}

function realBroadToRatio(real_value){
  return broad * real_value/real_broad;
}


/////////////////////////////////////////////////하체////////////////////////////////////////////////
var bottomDotData = [
              //다리시작점 0
              {x: broad/2-realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg'])},//다리시작 왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg'])},//다리시작 오른쪽
              //무릎 2
              {x: broad/2-realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']/2)},//무릎 왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']/2)},//무릎 오른쪽
              //발목 끝 4
              {x: broad/2-realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']/11)},//발목 왼쪽 - 발목이 11정도라 파악
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']/11)},//발목 오른쪽
               // 발목 가운데 6
               {x: broad/2-realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']/11)},
               {x: broad/2+realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']/11)},
               // 무릎 가운데 8
              {x: broad/2-realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']/2)},
              {x: broad/2+realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']/2)},
               //밑위 가랑이 10
               {x: broad/2-realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']-suggest_body['crotch'])},//밑위 왼쪽
               {x: broad/2+realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']-suggest_body['crotch'])},//밑위 오른쪽
               //발 12
               {x:broad/2-realBroadToRatio(my['foot_len']),
               y: tall-5},
               {x:broad/2+realBroadToRatio(my['foot_len']),
               y: tall-5},
               //발 안쪽 14
               {x: broad/2-realBroadToRatio(my['between_leg']/2),
               y: tall-5},
               {x: broad/2+realBroadToRatio(my['between_leg']/2),
               y: tall-5},
               // 발등 16
               {x:broad/2-realBroadToRatio(my['foot_len']),
               y: realTallToRatio(my['total_leg']/11)},
               {x:broad/2+realBroadToRatio(my['foot_len']),
               y: realTallToRatio(my['total_leg']/11)},
            ];


var bottomLinks = [
              //어깨
              {source : bottomDotData[0], target : bottomDotData[2]},
              {source : bottomDotData[2], target : bottomDotData[4]},
              {source : bottomDotData[6], target : bottomDotData[8]},
              {source : bottomDotData[6], target : bottomDotData[8]},
              {source : bottomDotData[8], target : bottomDotData[10]},
              {source : bottomDotData[10], target : bottomDotData[11]},
              {source : bottomDotData[11], target : bottomDotData[9]},
              {source : bottomDotData[9], target : bottomDotData[7]},
              {source : bottomDotData[5], target : bottomDotData[3]},
              {source : bottomDotData[3], target : bottomDotData[1]},
              //발모양
              {source : bottomDotData[4], target : bottomDotData[16]},
              {source : bottomDotData[16], target : bottomDotData[12]},
              {source : bottomDotData[12], target : bottomDotData[14]},
              {source : bottomDotData[14], target : bottomDotData[6]},
              //발 오른쪽
              {source : bottomDotData[5], target : bottomDotData[17]},
              {source : bottomDotData[17], target : bottomDotData[13]},
              {source : bottomDotData[13], target : bottomDotData[15]},
              {source : bottomDotData[15], target : bottomDotData[7]},
//              //무릎 선
//              {source : bottomDotData[2], target : bottomDotData[8]},
//              {source : bottomDotData[3], target : bottomDotData[9]},
            ];


shape.selectAll("circle.bottom")
     .data(bottomDotData)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; })
     .attr("r", "2px")
     .attr("fill", "grey");

shape.selectAll(".line")
     .data(bottomLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .attr("stroke-width", "3px")
     .style("stroke", bodyColor);



myBottom = {'bottom_waist' : suggest_body};

var bottomClothesDot = [
              //기장 0
              {x: broad/2-realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']-pant['length'])},//왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']-pant['length'])},//오른쪽
              //기장 안쪽 2
              {x: broad/2-realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']-pant['length'])},//왼쪽
              {x: broad/2+realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']-pant['length'])},//오른쪽
              //밑위 4
              {x: broad/2-realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']-pant['crotch'])},//밑위 왼쪽
              {x: broad/2+realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']-pant['crotch'])},//밑위 왼쪽
              //다리시작점 6
              {x: broad/2-realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg'])},//다리시작 왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg'])},//다리시작 오른쪽
            ];

var bottomClothesLinks = [
                    {source : bottomClothesDot[6], target : bottomClothesDot[0]}, // 다리시작점- 밑단끝점
                    {source : bottomClothesDot[0], target : bottomClothesDot[2]}, // 밑단끝점 - 밑단안점
                    {source : bottomClothesDot[2], target : bottomClothesDot[4]}, // 밑단안점 - 밑위
                    {source : bottomClothesDot[4], target : bottomClothesDot[5]}, // 밑위 왼쪽- 오른쪽
                    {source : bottomClothesDot[5], target : bottomClothesDot[3]}, //밑위- 기장안쪽
                    {source : bottomClothesDot[3], target : bottomClothesDot[1]}, //기장안쪽-기장
                    {source : bottomClothesDot[1], target : bottomClothesDot[7]}, //기장- 다리시작점
                    {source : bottomClothesDot[6], target : bottomClothesDot[7]}, // 다리시작 양쪽
                      //왼쪽
                    ];


shape.selectAll("circle.pant")
    .data(bottomClothesDot)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "5px")
    .attr("fill", clothes_color);


shape.selectAll(".line")
     .data(bottomClothesLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .attr("stroke-width", "3px")
     .style("stroke", clothes_color);