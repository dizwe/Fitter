var one_body = {"312": "352", "313": "278", "233": "597", "116": "467", "235": "871", "124": "229", "409": "86", "321": "239", "107": "1429", "120": "282", "510": "69.8", "422": "348", "318": "494", "225": "423", "314": "449", "401": "190", "231": "463", "320": "365", "119": "271", "203": "349", "417": "250", "122": "112", "206": "353", "209": "924", "421": "373", "213": "828", "219": "466", "228": "548", "128": "810", "416": "97", "319": "548", "111": "893", "427": "157", "236": "455", "117":"302", "232": "335", "413": "23", "223": "449", "425": "254", "214": "982", "221": "1485", "212": "820", "106": "1475", "407": "174", "227": "355", "420": "502", "codeNo": "120100001", "408": "102", "109": "1312", "131": "1101", "204": "363", "age": 23.39, "208": "979", "315": "337", "224": "413", "127": "222", "104": "1740", "205": "0", "_id": {"timeSecond": 1366875213, "time": 1366875213000, "inc": 1559866568, "machine": -458188847, "new": false}, "309": "605", "301": "908", "129": "665", "424": "226", "317": "400", "308": "415", "202": "392", "112": "794", "419": "550", "307": "532", "118": "290", "229": "0", "211": "806", "130": "238", "222": "313", "105": "1616", "311": "223", "415": "197", "241": "655", "115": "966", "108": "1448", "322": "107", "207": "445", "428": "307", "220": "1036", "237": "206", "239": "1667", "240": "716", "126": "210", "113": "1048", "426": "268", "218": "425", "403": "560", "110": "1079", "423": "347", "125": "217", "238": "1058", "402": "151", "234": "523", "121": "334", "201": "367", "310": "506", "217": "192", "230": "457", "123": "211", "210": "0", "216": "133", "114": "1024", "226": "453"};

var shirt = {"len":640,"shoulder":428,"chest":497,"sleeve":198};
var overshirt = {"len":650,"shoulder":580,"chest":600,"sleeve":500};

var suggest_bottom = {'bottom_waist':827, 'crotch':210, 'thigh':569, 'length':906, 'hem':221, 'hip':952,
                       'crotch_height':815, 'middle_thigh':524, 'knee':375, 'calf':385};

var pant = {"bottom_waist":380,"length":910,"crotch":200,"thigh":270,"hem":160};

//cm를 mm로 바꾸기
for (var key in test_shirt){
    test_shirt[key] *= 10;
}
var shirt = test_shirt;
//하의랑 상체랑 정보 합치기
suggest_body = Object.assign(suggest_body, suggest_bottom);
document.write(suggest_body['height']);
var tall = 1000; //키기준
var broad = 700; //어깨기준
var real_tall = real_tall*10;
var real_broad = suggest_body['shoulder']*2;

var shape = d3.select("body")
            .append("svg")
            .attr("width", broad)
            .attr("height", tall);


function valueToNumber(data){
  for (key in data){
    data[key] = Number(data[key]);
  }
  return data;
}
valueToNumber(one_body); //물음: 여기서는 클로저가 되어서 one_body 자료가 바뀌는건가?

function realTallToRatio(real_value){
  return tall- tall*real_value/real_tall;
}

function realBroadToRatio(real_value){
  return broad * real_value/real_broad;
}

var my = {
  'trunk_leg' : real_tall-150, //목높이
  'shoulder' : suggest_body['shoulder'],
  'arm_len' : suggest_body['arm'],
  'chest' : suggest_body['chest']/3.14,
  'waist' : suggest_body['waist']/3.14,
  'crotch_height' : one_body['128'],
  'total_leg' : suggest_body['length']/10*11, // 복숭아뼈 위부터였는데 다시 전체길이로
  //아래도리 - 옆모양으로 대부분 한거임
  'bottom_waist' : suggest_body['bottom_waist']/2, // 1:2인 타원 계산하면 짧은부분 반지름
  'hip' : suggest_body['hip']/2, //3:4 타원 짧은 반지름
  'thigh' : suggest_body['thigh']/2,
  'middle_thigh' : suggest_body['middle_thigh']/2,
  'knee' : suggest_body['knee']/2,
  'calf' : suggest_body['calf']/2,
  'hem' : suggest_body['hem']/2,

}

//상체만
var dotData = [
              //가랑이0 - 이건 중요해
              {x: broad/2,
              y: realTallToRatio(my['crotch_height'])},//가랑이
              //배꼽1 - y는 그냥 어깨기준(근데 너무 크면 어떡하지)V
              {x: broad/2,
              y: realTallToRatio(my['trunk_leg']-my['shoulder']/4*5)},//배꼽
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
              //가랑이 선
              {x: broad/2,
              y: realTallToRatio(my['crotch_height']-my['shoulder']/10)},//가랑이
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
            ];


shape.selectAll("circle.body")
     .data(dotData)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; })
     .attr("r", "5px")
     .attr("fill", "grey");

shape.selectAll(".line")
     .data(topLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .style("stroke", "rgb(6,120,155)");


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
               {x: broad/2-realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']/11)},
               {x: broad/2+realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']/11)},
               // 무릎 가운데 8
              {x: broad/2-realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']/2)},
              {x: broad/2+realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']/2)},
               //밑위 10
               {x: broad/2-realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']-suggest_body['crotch'])},//밑위 왼쪽
               {x: broad/2+realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']-suggest_body['crotch'])},//밑위 오른쪽
               //발
               {x:broad/2-realBroadToRatio(my['chest']/2),
               y: tall-5},
               {x:broad/2+realBroadToRatio(my['chest']/2),
               y: tall-5},
               //발 안쪽
               {x: broad/2-realBroadToRatio(my['chest']/10),
               y: tall-5},
               {x: broad/2+realBroadToRatio(my['chest']/10),
               y: tall-5},
            ];


var bottomLinks = [
              //어깨
              {source : bottomDotData[0], target : bottomDotData[2]},
              {source : bottomDotData[2], target : bottomDotData[4]},
              {source : bottomDotData[4], target : bottomDotData[6]},
              {source : bottomDotData[6], target : bottomDotData[8]},
              {source : bottomDotData[6], target : bottomDotData[8]},
              {source : bottomDotData[8], target : bottomDotData[10]},
              {source : bottomDotData[10], target : bottomDotData[11]},
              {source : bottomDotData[11], target : bottomDotData[9]},
              {source : bottomDotData[9], target : bottomDotData[7]},
              {source : bottomDotData[7], target : bottomDotData[5]},
              {source : bottomDotData[5], target : bottomDotData[3]},
              {source : bottomDotData[3], target : bottomDotData[1]},

            ];


shape.selectAll("circle.bottom")
     .data(bottomDotData)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; })
     .attr("r", "5px")
     .attr("fill", "grey");

shape.selectAll(".line")
     .data(bottomLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .style("stroke", "rgb(6,120,155)");


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
              y: realTallToRatio(my['trunk_leg']-shirt['len'])},//기장 오른쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
              y: realTallToRatio(my['trunk_leg']-shirt['len'])},//기장 오른쪽
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
                      {source : dotData[2], target : topDot[0]},//실제 어깨- 옷 어깨
                      {source : topDot[0], target : topDot[4]}, //옷 어깨- 팔
                      {source : topDot[4], target : topDot[6]}, //소매- 소매안쪽
                      {source : topDot[2], target : dotData[12]}, //소매안쪽- 기장끝
                      //기장 연결
                      {source : topDot[2], target : topDot[3]}, // 기장왼쪽 -기장오른쪽
                      //오른쪽팔
                      {source : dotData[3], target : topDot[1]},//실제 어깨- 옷 어깨
                      {source : topDot[1], target : topDot[5]}, //옷 어깨- 팔
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
    .attr("fill", "red");


shape.selectAll(".line")
     .data(topClothesLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .style("stroke", "rgb(200,29,155)");


////////////////////////////////////////하체 옷 ////////////////////////////////////////////////////////
myBottom = {'bottom_waist' : suggest_body
};

document.write(my['total_leg']-pant['length']);
var bottomClothesDot = [
              //기장 0
              {x: broad/2-realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']-pant['length'])},//왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['total_leg']-pant['length'])},//오른쪽
              //기장 안쪽 2
              {x: broad/2-realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']-pant['length'])},//왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']-pant['length'])},//오른쪽
              //밑위 4
              {x: broad/2-realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']-pant['crotch'])},//밑위 왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/10),
               y: realTallToRatio(my['total_leg']-pant['crotch'])},//밑위 왼쪽
            ];

var bottomClothesLinks = [
                    {source : bottomDotData[0], target : bottomClothesDot[0]}, // 다리시작점- 밑단끝점
                    {source : bottomClothesDot[0], target : bottomClothesDot[2]}, // 밑단끝점 - 밑단안점
                    {source : bottomClothesDot[2], target : bottomClothesDot[4]}, // 밑단안점 - 밑위
                    {source : bottomClothesDot[4], target : bottomClothesDot[5]}, // 밑위 왼쪽- 오른쪽
                    {source : bottomClothesDot[5], target : bottomClothesDot[3]}, //밑위- 기장안쪽
                    {source : bottomClothesDot[3], target : bottomClothesDot[1]}, //기장안쪽-기장
                    {source : bottomClothesDot[1], target : bottomDotData[1]}, //기장- 다리시작점
                    //실제 어깨- 옷 어깨
                      //왼쪽
                    ];


shape.selectAll("circle.pant")
    .data(bottomClothesDot)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "5px")
    .attr("fill", "red");


shape.selectAll(".line")
     .data(bottomClothesLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .style("stroke", "rgb(200,29,155)");

