var tall = 400; //키기준
var broad = 300; //어깨기준
var half_tall = real_tall/2;
var real_broad = suggest_body['shoulder']+50;

var shape = d3.select("div.frontVisual")
            .append("svg")
            .attr("viewBox","0 100 300 500");

function realTallToRatio(real_value){
  return tall- tall*(real_value-half_tall)/half_tall;
}

function realBroadToRatio(real_value){
  return broad * real_value/real_broad;
}


var topCal = {
              'shoulder':shirt['shoulder']-suggest_body['shoulder'],
              'chest':shirt['chest']-suggest_body['chest']/2,
              'waist':shirt['chest']-suggest_body['waist']/2,
//              'length':shirt['top_length']-(real_tall-suggest_body['crotch_height']),
//              'sleeve':shirt['sleeve']-suggest_body['arm'],
        };



//상체만
var dotData = [
              //가랑이0 - 이건 중요해
              {x: 0,
              y: 0},//가랑이
              //배꼽1 - y는 그냥 어깨기준(근데 너무 크면 어떡하지)V
              {x: 0,
              y: 0},//배꼽
              //어깨2V
              {x: broad/2-realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg'])},//어깨왼쪽
              {x: broad/2+realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg'])},//어깨오른
              //팔꿈치4 - y는 팔의 반정도지만 반보다는 크게 잡음 V
              {x: broad/2-realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg']-my['arm_len']/11*6)},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg']-my['arm_len']/11*6)},//팔오른쪽
              //팔6V
              {x: broad/2-realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg']-my['arm_len'])},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg']-my['arm_len'])},//팔오른쪽
              //팔꿈치 연결점8 - 팔 두께는 그냥 시발 어깨 1/4정도
              {x: broad/2-realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['trunk_leg']-my['arm_len']/11*6)},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['trunk_leg']-my['arm_len']/11*6)},//팔오른쪽
              //팔 연결점10 - 팔둘레 계산 못함
              {x: broad/2-realBroadToRatio(my['chest']/2),
              y: realTallToRatio(my['trunk_leg']-my['arm_len'])},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['chest']/2),
              y: realTallToRatio(my['trunk_leg']-my['arm_len'])},//팔오른쪽
              //가슴12 - y 부분은 그냥 내 어깨가 400이라면 어깨부터 팔죽지 거리는 10이라서 V
              {x: broad/2-realBroadToRatio(my['chest']/2),//208 가슴둘레
               y: realTallToRatio(my['trunk_leg']-(my['shoulder']/4))},//가슴왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['trunk_leg']-(my['shoulder']/4))},//가슴오른쪽
               //바지 시작 옆점14
              {x: broad/2-realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg'])},//가랑이 왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg'])},//가랑이 오른쪽
               //손 16 - 손길이는 어깨 길이의 1/3 정도
              {x: broad/2-realBroadToRatio(my['shoulder']/2),
              y: realTallToRatio(my['trunk_leg']-my['arm_len']-(my['shoulder']/4))},//손 바깥쪽
              {x: broad/2+realBroadToRatio(my['shoulder']/2),
              y: realTallToRatio(my['trunk_leg']-my['arm_len']-(my['shoulder']/4))},//손 안쪽
              //손 안쪽 18
              {x: broad/2-realBroadToRatio(my['chest']/2),
              y: realTallToRatio(my['trunk_leg']-my['arm_len']-(my['shoulder']/4))},//손 바깥쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
              y: realTallToRatio(my['trunk_leg']-my['arm_len']-(my['shoulder']/4))},//손 안쪽
              //밑위 가랑이 20
               {x: broad/2-realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['crotch_height'])},//밑위 왼쪽
               {x: broad/2+realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['crotch_height'])},//밑위 오른쪽
               //밑위 가랑이 아래 22
               {x: broad/2-realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']-suggest_body['crotch']-100)},//밑위 왼쪽
               {x: broad/2+realBroadToRatio(my['between_leg']/2),
               y: realTallToRatio(my['total_leg']-suggest_body['crotch']-100)},//밑위 오른쪽
               //가랑이 양옆 점 24
               {x: broad/2-realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']-suggest_body['crotch']-100)},//밑위 왼쪽
               {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']-suggest_body['crotch']-100)},//밑위 오른쪽
//              //가랑이 12 - 이건 중요해
//              {x: broad/2,
//              y: realTallToRatio(my['crotch_height']-20)},//가랑이
            ];


var topLinks = [
              //어깨
              {source : dotData[2], target : dotData[3]},
              //왼쪽팔파트
              {source : dotData[2], target : dotData[4]}, //어깨-팔꿈치
              {source : dotData[4], target : dotData[6]}, //팔꿈치-팔
              {source : dotData[8], target : dotData[10]}, //안쪽팔-안쪽팔꿈치
              {source : dotData[10], target : dotData[12]}, //안쪽 팔꿈치-가슴
              //오른쪽 팔파트
              {source : dotData[3], target : dotData[5]}, //어깨-팔꿈치
              {source : dotData[5], target : dotData[7]}, //팔꿈치-팔
              {source : dotData[9], target : dotData[11]}, //안쪽팔-안쪽팔꿈치
              {source : dotData[11], target : dotData[13]}, //안쪽 팔꿈치-가슴
              //몸 안쪽
              {source : dotData[9], target : dotData[15]}, //안쪽 팔-가랑이
              {source : dotData[10], target : dotData[14]}, //안쪽 팔- 가랑이
              //왼손
              {source : dotData[6], target : dotData[16]}, // 손 바깥쪽
              {source : dotData[16], target : dotData[18]}, //손 아래쪽
              {source : dotData[6], target : dotData[10]}, // 손 위쪽
              //오른손
              {source : dotData[7], target : dotData[17]}, // 손 바깥쪽
              {source : dotData[17], target : dotData[19]}, //손 아래쪽
              {source : dotData[7], target : dotData[11]}, // 손 위쪽
              //가랑이
              {source : dotData[22], target : dotData[20]}, // 가랑이 왼쪽 세로
              {source : dotData[20], target : dotData[21]}, // 가랑이 가로
              {source : dotData[21], target : dotData[23]}, // 가랑이 오른쪽 세로
              {source : dotData[14], target : dotData[24]}, // 가랑이 양옆 왼쪽
              {source : dotData[15], target : dotData[25]}, // 가랑이 양옆 왼쪽
            ];


shape.selectAll("circle.body")
     .data(dotData)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; })
     .attr("r", "4px")
     .attr("fill", bodyColor);

// 배꼽
shape.selectAll("text.belly")
     .data(dotData)
     .enter()
     .append("text")
     .attr("x", broad/2)
     .attr("y", realTallToRatio(my['trunk_leg']-my['belly_from_top']))
     .text("X")
     .attr("font-family", "sans-serif")
     .attr("font-size", "15px")
     .attr("fill", bodyColor)
     .attr("text-anchor", "middle");


//     .attr("x", function(d){20})//broad/2;})
//     .attr("y", function(d){30})//realTallToRatio(my['trunk_leg']-my['shoulder']/4*5);})
shape.selectAll(".line")
     .data(topLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .attr("stroke-width", "3px")
     .style("stroke", bodyColor);




////////////////////////////////// 상체 옷////////////////////////////////////////////



myTop = {'remain_shoulder' : shirt['shoulder']-my['shoulder']};
//어깨는 상황에 따라 위치가 달라져야함
if (myTop['remain_shoulder']<=0){
    var shoulder_data = [{x: broad/2-realBroadToRatio(my['shoulder']/2+myTop['remain_shoulder']/2),
                          y: realTallToRatio(my['trunk_leg'])},//어깨왼쪽
                          {x: broad/2+realBroadToRatio(my['shoulder']/2+myTop['remain_shoulder']/2),
                          y: realTallToRatio(my['trunk_leg'])},//어깨오른쪽
                         ]
}else{
    var shoulder_data = [{x: broad/2-realBroadToRatio(my['shoulder']/2),
                          y: realTallToRatio(my['trunk_leg']-myTop['remain_shoulder']/2)},//어깨왼쪽
                          {x: broad/2+realBroadToRatio(my['shoulder']/2),
                          y: realTallToRatio(my['trunk_leg']-myTop['remain_shoulder']/2)},//어깨오른쪽
                        ]
};


var topDot = [
          //어깨0 - 짧을때는 어깨에, 길때는 팔에 있어야 하는데... 흠  ㅜㅜ
          shoulder_data[0],//어깨왼쪽
          shoulder_data[1],//어깨오른쪽
          // 기장2 V
          {x: broad/2-realBroadToRatio(my['chest']/2),
          y: realTallToRatio(my['trunk_leg']-shirt['top_length'])},//기장 오른쪽
          {x: broad/2+realBroadToRatio(my['chest']/2),
          y: realTallToRatio(my['trunk_leg']-shirt['top_length'])},//기장 오른쪽
          // 소매4 V
          {x: broad/2-realBroadToRatio(my['shoulder']/2),
          y: realTallToRatio(my['trunk_leg']-(myTop['remain_shoulder']/2+shirt['sleeve']))},//소매 왼쪽 -어깨연결
          {x: broad/2+realBroadToRatio(my['shoulder']/2),
          y: realTallToRatio(my['trunk_leg']-(myTop['remain_shoulder']/2+shirt['sleeve']))},//어깨왼쪽
          // 소매 안쪽6
          {x: broad/2-realBroadToRatio(my['chest']/2),
          y: realTallToRatio(my['trunk_leg']-(myTop['remain_shoulder']/2+shirt['sleeve']))},//소매 왼쪽 -어깨연결
          {x: broad/2+realBroadToRatio(my['chest']/2),
          y: realTallToRatio(my['trunk_leg']-(myTop['remain_shoulder']/2+shirt['sleeve']))},//어깨왼쪽
        ];


var topClothesLinks = [
              //왼쪽팔
              {source : topDot[0], target : dotData[2]}, //옷 어깨- 실제 어깨
              {source : dotData[2], target : topDot[4]}, //실제 어깨- 팔
              {source : topDot[4], target : topDot[6]}, //소매- 소매안쪽
              {source : topDot[2], target : dotData[12]}, //소매안쪽- 기장끝
              //기장 연결
              {source : topDot[2], target : topDot[3]}, // 기장왼쪽 -기장오른쪽
              //오른쪽팔
              {source : topDot[1], target : dotData[3]},//실제 어깨- 옷 어깨
              {source : dotData[3], target : topDot[5]}, //옷 어깨- 팔
              {source : topDot[5], target : topDot[7]}, //소매- 소매안쪽
              {source : topDot[3], target : dotData[13]}, //소매안쪽- 기장끝
              //어깨연결
              {source : dotData[2], target : dotData[3]},//양쪽 어깨
              {source : topDot[0], target : dotData[12]},// 옷 어깨- 가슴
              {source : topDot[1], target : dotData[13]},// 옷 어깨- 가슴

                ];

shape.selectAll("circle.shirt")
    .data(topDot)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "5px")
    .attr("fill", clothes_color);


shape.selectAll(".line")
     .data(topClothesLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .attr("stroke-width", "3px")
     .style("stroke", clothes_color);
