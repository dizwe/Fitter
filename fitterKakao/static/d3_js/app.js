var one_body = {"312": "352", "313": "278", "233": "597", "116": "467", "235": "871", "124": "229", "409": "86", "321": "239", "107": "1429", "120": "282", "510": "69.8", "422": "348", "318": "494", "225": "423", "314": "449", "401": "190", "231": "463", "320": "365", "119": "271", "203": "349", "417": "250", "122": "112", "206": "353", "209": "924", "421": "373", "213": "828", "219": "466", "228": "548", "128": "810", "416": "97", "319": "548", "111": "893", "427": "157", "236": "455", "117":"302", "232": "335", "413": "23", "223": "449", "425": "254", "214": "982", "221": "1485", "212": "820", "106": "1475", "407": "174", "227": "355", "420": "502", "codeNo": "120100001", "408": "102", "109": "1312", "131": "1101", "204": "363", "age": 23.39, "208": "979", "315": "337", "224": "413", "127": "222", "104": "1740", "205": "0", "_id": {"timeSecond": 1366875213, "time": 1366875213000, "inc": 1559866568, "machine": -458188847, "new": false}, "309": "605", "301": "908", "129": "665", "424": "226", "317": "400", "308": "415", "202": "392", "112": "794", "419": "550", "307": "532", "118": "290", "229": "0", "211": "806", "130": "238", "222": "313", "105": "1616", "311": "223", "415": "197", "241": "655", "115": "966", "108": "1448", "322": "107", "207": "445", "428": "307", "220": "1036", "237": "206", "239": "1667", "240": "716", "126": "210", "113": "1048", "426": "268", "218": "425", "403": "560", "110": "1079", "423": "347", "125": "217", "238": "1058", "402": "151", "234": "523", "121": "334", "201": "367", "310": "506", "217": "192", "230": "457", "123": "211", "210": "0", "216": "133", "114": "1024", "226": "453"};

var shirt = {"len":640,"shoulder":428,"chest":497,"sleeve":198};
var overshirt = {"len":650,"shoulder":580,"chest":600,"sleeve":500};
var pant = {"waist":360,"len":970,"crotch":220,"thigh":270,"hem":150};

//cm를 mm로 바꾸기
for (var key in test_shirt){
    test_shirt[key] *= 10;
}
var shirt = test_shirt;

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
  'thigh' : one_body['419']/3.14, //시각화를 위해 지름정도로 표현
  'arm_len' : suggest_body['arm'],
  'chest' : suggest_body['chest']/3.14,
  'waist' : suggest_body['waist']/3.14,
}

//상체만
var dotData = [
              //가랑이0 - 이건 중요해
              {x: broad/2,
              y: realTallToRatio(one_body['128'])},//가랑이
              //배꼽1 - y는 그냥 어깨기준(근데 너무 크면 어떡하지)V
              {x: broad/2,
              y: realTallToRatio(my['trunk_leg']-my['shoulder']/4*5)},//배꼽
              //어깨2V
              {x: broad/2-realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg'])},//어깨왼쪽
              {x: broad/2+realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg'])},//어깨오른
              //팔꿈치4 - y는 팔의 반정도지만 반보다는 크게 잡음 V
              {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5),
               y: realTallToRatio(my['trunk_leg']-my['arm_len']/11*6)},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5),
               y: realTallToRatio(my['trunk_leg']-my['arm_len']/11*6)},//팔오른쪽
              //팔6V
              {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5+10),
               y: realTallToRatio(my['trunk_leg']-my['arm_len'])},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5+10),
               y: realTallToRatio(my['trunk_leg']-my['arm_len'])},//팔오른쪽
              //팔꿈치 연결점8 - 팔 두께는 그냥 시발 어깨 1/4정도
              {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5-my['shoulder']/6),
               y: realTallToRatio(my['trunk_leg']-my['arm_len']/11*6)},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5-my['shoulder']/6),
               y: realTallToRatio(my['trunk_leg']-my['arm_len']/11*6)},//팔오른쪽
              //팔 연결점10 - 팔둘레 계산 못함
              {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5+10-my['shoulder']/8),
              y: realTallToRatio(my['trunk_leg']-my['arm_len'])},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5+10-my['shoulder']/8),
              y: realTallToRatio(my['trunk_leg']-my['arm_len'])},//팔오른쪽
              //가슴12 - y 부분은 그냥 내 어깨가 400이라면 어깨부터 팔죽지 거리는 10이라서 V
              {x: broad/2-realBroadToRatio(my['chest']/2),//208 가슴둘레
               y: realTallToRatio(my['trunk_leg']-(my['shoulder']/4))},//가슴왼쪽
              {x: broad/2+realBroadToRatio(my['chest']/2),
               y: realTallToRatio(my['trunk_leg']-(my['shoulder']/4))},//가슴오른쪽
              //허리14 - 이것도 y 부분 어깨 400이라면 허리까지도 400 V
              {x: broad/2-realBroadToRatio(my['waist']/2),
               y: realTallToRatio(my['trunk_leg']-my['shoulder'])},//허리왼쪽
              {x: broad/2+realBroadToRatio(my['waist']/2),
               y: realTallToRatio(my['trunk_leg']-my['shoulder'])},//허리오른쪽
              //배꼽수준 허리16 - 이것도 y 부분 어깨 400이라면 허리까지도 400 V
              {x: broad/2-realBroadToRatio(one_body['212']/3.14/2),
               y: realTallToRatio(my['trunk_leg']-my['shoulder'])},//왼쪽
              {x: broad/2+realBroadToRatio(one_body['212']/3.14/2),
               y: realTallToRatio(my['trunk_leg']-my['shoulder'])},//오른쪽
               //넙다리18
              {x: broad/2-realBroadToRatio(my['thigh']),
               y: realTallToRatio(one_body['128'])},//넙다리 왼쪽
              {x: broad/2+realBroadToRatio(my['thigh']),
               y: realTallToRatio(one_body['128'])},//넙다리 오른쪽
            ];

var topLinks = [
  //팔파트
  {source : dotData[2], target : dotData[4]},
  {source : dotData[4], target : dotData[6]},
  {source : dotData[3], target : dotData[5]},
  {source : dotData[5], target : dotData[7]},
  //팔안파트
  {source : dotData[12], target : dotData[8]},
  {source : dotData[8], target : dotData[10]},
  {source : dotData[13], target : dotData[9]},
  {source : dotData[9], target : dotData[11]},
  //몸 안쪽
  {source : dotData[12], target : dotData[14]},
  {source : dotData[14], target : dotData[16]},
  {source : dotData[16], target : dotData[18]},
  {source : dotData[13], target : dotData[15]},
  {source : dotData[15], target : dotData[17]},
  {source : dotData[17], target : dotData[19]},
]


myTop = {'remain_shoulder' : shirt['shoulder']-my['shoulder']};
var topDot = [
  //어깨0 V
  {x: broad/2-realBroadToRatio(my['shoulder']/2+20),
  y: realTallToRatio(my['trunk_leg']-myTop['remain_shoulder']/2)},//어깨왼쪽
  {x: broad/2+realBroadToRatio(my['shoulder']/2+20),
  y: realTallToRatio(my['trunk_leg']-myTop['remain_shoulder']/2)},//어깨오른쪽
  // 가슴2 - 크면 드레이핑 되는걸 표현할 수가 없잖아!! 시발
  {x: broad/2-realBroadToRatio(shirt['chest']/3.14),
  y: realTallToRatio(my['trunk_leg']-(my['shoulder']/4))},//가슴왼쪽
  {x: broad/2+realBroadToRatio(shirt['chest']/3.14),
  y: realTallToRatio(my['trunk_leg']-(my['shoulder']/4))},//가스왼쪽
  // 기장4 V
  {x: broad/2-realBroadToRatio(shirt['chest']/3.14),
  y: realTallToRatio(my['trunk_leg']-shirt['len'])},//기장 오른쪽
  {x: broad/2+realBroadToRatio(shirt['chest']/3.14),
  y: realTallToRatio(my['trunk_leg']-shirt['len'])},//기장 오른쪽
  // 소매6 V
  {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5+20),
  y: realTallToRatio(my['trunk_leg']-(myTop['remain_shoulder']/2+shirt['sleeve']))},//소매 왼쪽 -어깨연결
  {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5+20),
  y: realTallToRatio(my['trunk_leg']-(myTop['remain_shoulder']/2+shirt['sleeve']))},//어깨왼쪽
  // 소매 안쪽8
  {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5+10-my['shoulder']/8-20),
  y: realTallToRatio(my['trunk_leg']-(myTop['remain_shoulder']/2+shirt['sleeve']))},//소매 왼쪽 -어깨연결
  {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5+10-my['shoulder']/8-20),
  y: realTallToRatio(my['trunk_leg']-(myTop['remain_shoulder']/2+shirt['sleeve']))},//어깨왼쪽
]

var topClothesLinks = [
  //왼쪽팔
  {source : dotData[2], target : topDot[0]},
  {source : topDot[0], target : topDot[6]},
  {source : topDot[6], target : topDot[8]},
  {source : topDot[8], target : dotData[12]},
  //몸통
  {source : dotData[12], target : topDot[4]},
  {source : topDot[4], target : topDot[5]},
  {source : topDot[5], target : dotData[13]},
  {source : dotData[13], target : topDot[9]},
  {source : topDot[9], target : topDot[7]},
  {source : topDot[7], target : topDot[1]},
  {source : topDot[1], target : dotData[3]},
  {source : dotData[3], target : dotData[2]},
]

document.write(((my['trunk_leg']-one_body['202'])+one_body['115'])/2);
document.write(one_body['115']);
document.write(((my['trunk_leg']-one_body['202'])+one_body['115'])/2-pant['len']);

shape.selectAll("circle.body")
     .data(dotData)
     .enter()
     .append("circle")
     .attr("cx", function(d) { return d.x; })
     .attr("cy", function(d) { return d.y; })
     .attr("r", "5px")
     .attr("fill", "grey");

shape.selectAll("circle.shirt")
    .data(topDot)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "5px")
    .attr("fill", "red");



shape.selectAll(".line")
     .data(topLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .style("stroke", "rgb(6,120,155)");

shape.selectAll(".line")
     .data(topClothesLinks)
     .enter()
     .append("line")
     .attr("x1", function(d) { return d.source.x })
     .attr("y1", function(d) { return d.source.y })
     .attr("x2", function(d) { return d.target.x })
     .attr("y2", function(d) { return d.target.y })
     .style("stroke", "rgb(200,29,155)");


/* 몸 전체
var dotData = [
              //가랑이0
              {x: broad/2,
              y: realTallToRatio(one_body['128'])},//가랑이
              //배꼽1
              {x: broad/2,
              y: realTallToRatio(my['trunk_leg']-one_body['202'])},//배꼽
              //어깨2
              {x: broad/2-realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg'])},//어깨왼쪽
              {x: broad/2+realBroadToRatio(my['shoulder']/2),
               y: realTallToRatio(my['trunk_leg'])},//어깨오른
              //팔꿈치4
              {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5),
               y: realTallToRatio(my['trunk_leg']-one_body['232'])},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5),
               y: realTallToRatio(my['trunk_leg']-one_body['232'])},//팔오른쪽
              //팔6
              {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5+10),
               y: realTallToRatio(my['trunk_leg']-one_body['233'])},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5+10),
               y: realTallToRatio(my['trunk_leg']-one_body['233'])},//팔오른쪽
              //팔꿈치 연결점8
              {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5-one_body['426']/3.14),
               y: realTallToRatio(my['trunk_leg']-one_body['232'])},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5-one_body['426']/3.14),
               y: realTallToRatio(my['trunk_leg']-one_body['232'])},//팔오른쪽
              //팔 연결점10
              {x: broad/2-realBroadToRatio(my['shoulder']/2*6/5+10-one_body['427']/3.14),
              y: realTallToRatio(my['trunk_leg']-one_body['233'])},//팔왼쪽(233 팔)
              {x: broad/2+realBroadToRatio(my['shoulder']/2*6/5+10-one_body['427']/3.14),
              y: realTallToRatio(my['trunk_leg']-one_body['233'])},//팔오른쪽
              //가슴12
              {x: broad/2-realBroadToRatio(one_body['208']/3.14/2),//208 가슴둘레
               y: realTallToRatio(my['trunk_leg']-(one_body['233']-one_body['234']))},//가슴왼쪽
              {x: broad/2+realBroadToRatio(one_body['208']/3.14/2),
               y: realTallToRatio(my['trunk_leg']-(one_body['233']-one_body['234']))},//가슴오른쪽
              //허리14
              {x: broad/2-realBroadToRatio(one_body['211']/3.14/2),
               y: realTallToRatio(my['trunk_leg']-one_body['202']+30)},//허리왼쪽
              {x: broad/2+realBroadToRatio(one_body['211']/3.14/2),
               y: realTallToRatio(my['trunk_leg']-one_body['202']+30)},//허리오른쪽
              //배꼽수준 허리16
              {x: broad/2-realBroadToRatio(one_body['212']/3.14/2),
               y: realTallToRatio(my['trunk_leg']-one_body['202'])},//왼쪽
              {x: broad/2+realBroadToRatio(one_body['212']/3.14/2),
               y: realTallToRatio(my['trunk_leg']-one_body['202'])},//오른쪽
              //넙다리18
              {x: broad/2-realBroadToRatio(my['thigh']),
               y: realTallToRatio(one_body['128'])},//넙다리 왼쪽
              {x: broad/2+realBroadToRatio(my['thigh']),
               y: realTallToRatio(one_body['128'])},//넙다리 오른쪽
              //넙다리중간20
              {x: broad/2-realBroadToRatio(my['thigh']-one_body['420']/3.14),
               y: realTallToRatio((one_body['128']-one_body['222']/2))},//넙다리중간 왼쪽(넙다리직선둘레 뺌222)
              {x: broad/2+realBroadToRatio(my['thigh']-one_body['420']/3.14),
               y: realTallToRatio((one_body['128']-one_body['222']/2))},//넙다리중간 오른쪽
              //무릎22
              {x: broad/2-realBroadToRatio(my['thigh']-one_body['421']/3.14),
               y: realTallToRatio(one_body['128']-one_body['222'])},//무릎 왼쪽
              {x: broad/2+realBroadToRatio(my['thigh']-one_body['421']/3.14),
               y: realTallToRatio(one_body['128']-one_body['222'])},//무릎 오른쪽
              //장딴지24
              {x: broad/2-realBroadToRatio(my['thigh']-one_body['423']/3.14),
               y: realTallToRatio(one_body['116']/4*3)},//장딴지 왼쪽(무릎높이116)
              {x: broad/2+realBroadToRatio(my['thigh']-one_body['423']/3.14),
               y: realTallToRatio(one_body['116']/4*3)},//장딴지 오른쪽
              //발목26
              {x: broad/2-realBroadToRatio(my['thigh']-one_body['424']/3.14),
               y: realTallToRatio(70)},//발목 왼쪽
              {x: broad/2+realBroadToRatio(my['thigh']-one_body['424']/3.14),
               y: realTallToRatio(70)},//발목 오른쪽
              //발목 끝28
              {x: broad/2-realBroadToRatio(my['thigh']),
               y: realTallToRatio(70)},//발목 왼쪽
              {x: broad/2+realBroadToRatio(my['thigh']),
               y: realTallToRatio(70)},//발목 오른쪽
            ];

var links = [
  //팔파트
  {source : dotData[2], target : dotData[4]},
  {source : dotData[4], target : dotData[6]},
  {source : dotData[3], target : dotData[5]},
  {source : dotData[5], target : dotData[7]},
  //팔안파트
  {source : dotData[12], target : dotData[8]},
  {source : dotData[8], target : dotData[10]},
  {source : dotData[13], target : dotData[9]},
  {source : dotData[9], target : dotData[11]},
  //몸 안쪽
  {source : dotData[12], target : dotData[14]},
  {source : dotData[14], target : dotData[16]},
  {source : dotData[16], target : dotData[18]},
  {source : dotData[18], target : dotData[28]},
  {source : dotData[13], target : dotData[15]},
  {source : dotData[15], target : dotData[17]},
  {source : dotData[17], target : dotData[19]},
  {source : dotData[19], target : dotData[29]},
  //다리
  {source : dotData[0], target : dotData[20]},
  {source : dotData[20], target : dotData[22]},
  {source : dotData[22], target : dotData[24]},
  {source : dotData[24], target : dotData[26]},
  {source : dotData[0], target : dotData[21]},
  {source : dotData[21], target : dotData[23]},
  {source : dotData[23], target : dotData[25]},
  {source : dotData[25], target : dotData[27]},
]

var bottomDot = [
  //허리
  {x: broad/2-realBroadToRatio(pant['waist']*2/3.14)/2,//바지 허리 길이 반인데 다시 반쪽 빠지니까
   y: realTallToRatio(my['trunk_leg']-one_body['202']-50)},//왼쪽
  {x: broad/2+realBroadToRatio(pant['waist']/3.14),
  y: realTallToRatio(my['trunk_leg']-one_body['202']-50)},//오른쪽
  //기장
  {x: broad/2-realBroadToRatio(my['thigh']),
   y: realTallToRatio(((my['trunk_leg']-one_body['202'])+one_body['115'])/2-pant['len'])},//왼쪽
  {x: broad/2+realBroadToRatio(my['thigh']),
   y: realTallToRatio(((my['trunk_leg']-one_body['202'])+one_body['115'])/2-pant['len'])},//오른쪽
  //허벅지
  {x: broad/2-realBroadToRatio(my['thigh']-pant['thigh']*2/3.14),// 이건 반쪽 빠지는게 아니라 한쪽 다 빠지는거
   y: realTallToRatio((one_body['128']-one_body['222']/2))},//넙다리중간 왼쪽(넙다리직선둘레 뺌222)
  {x: broad/2+realBroadToRatio(my['thigh']-pant['thigh']*2/3.14),
   y: realTallToRatio((one_body['128']-one_body['222']/2))},//넙다리중간 오른쪽
   //밑단
   {x: broad/2-realBroadToRatio(my['thigh']-pant['hem']*2/3.14),
    y: realTallToRatio(70)},//넙다리중간 왼쪽(넙다리직선둘레 뺌222)
   {x: broad/2+realBroadToRatio(my['thigh']-pant['hem']*2/3.14),
    y: realTallToRatio(70)},//넙다리중간 오른쪽
]
*/

/*
shape.selectAll("circle.pant")
    .data(bottomDot)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "5px")
    .attr("fill", "black");
*/