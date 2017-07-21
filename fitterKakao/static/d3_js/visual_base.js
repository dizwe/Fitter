var one_body = {"312": "352", "313": "278", "233": "597", "116": "467", "235": "871", "124": "229", "409": "86", "321": "239", "107": "1429", "120": "282", "510": "69.8", "422": "348", "318": "494", "225": "423", "314": "449", "401": "190", "231": "463", "320": "365", "119": "271", "203": "349", "417": "250", "122": "112", "206": "353", "209": "924", "421": "373", "213": "828", "219": "466", "228": "548", "128": "810", "416": "97", "319": "548", "111": "893", "427": "157", "236": "455", "117":"302", "232": "335", "413": "23", "223": "449", "425": "254", "214": "982", "221": "1485", "212": "820", "106": "1475", "407": "174", "227": "355", "420": "502", "codeNo": "120100001", "408": "102", "109": "1312", "131": "1101", "204": "363", "age": 23.39, "208": "979", "315": "337", "224": "413", "127": "222", "104": "1740", "205": "0", "_id": {"timeSecond": 1366875213, "time": 1366875213000, "inc": 1559866568, "machine": -458188847, "new": false}, "309": "605", "301": "908", "129": "665", "424": "226", "317": "400", "308": "415", "202": "392", "112": "794", "419": "550", "307": "532", "118": "290", "229": "0", "211": "806", "130": "238", "222": "313", "105": "1616", "311": "223", "415": "197", "241": "655", "115": "966", "108": "1448", "322": "107", "207": "445", "428": "307", "220": "1036", "237": "206", "239": "1667", "240": "716", "126": "210", "113": "1048", "426": "268", "218": "425", "403": "560", "110": "1079", "423": "347", "125": "217", "238": "1058", "402": "151", "234": "523", "121": "334", "201": "367", "310": "506", "217": "192", "230": "457", "123": "211", "210": "0", "216": "133", "114": "1024", "226": "453"};

var tall = 1000; //키기준
var broad = 700; //어깨기준
var real_tall = real_tall*10;
var real_broad = suggest_body['shoulder']*2;

var shirt = test_shirt.map(mmToCm)
function mmToCm(mm){
    cm = Math.round(mm/10);
    return cm
}



var pant = test_pants;
for (var key in pant){
    pant[key] *= 10;
};
console.log(pant);

myBottom = {'bottom_waist' : suggest_body};


function valueToNumber(data){
  for (key in data){
    data[key] = Number(data[key]);
  }
  return data;
}
valueToNumber(one_body); //물음: 여기서는 클로저가 되어서 one_body 자료가 바뀌는건가?

function realTallToRatio(real_value){
  return tall- tall*(real_value-real_tall)/real_tall*2;
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
  'chest_half' : suggest_body['chest']/2,
  'waist_half' : suggest_body['waist']/2,
  'nipple_half' : suggest_body['nipple']/2,
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
  'between_leg' : suggest_body['chest']/3.14/10,
  'foot_len' : suggest_body['chest']/3.14/1.8,
};

myTop = {'remain_shoulder' : shirt['shoulder']-my['shoulder']};

// 바지길이가 달라질때마다 달라지는 hem 길이 반영
var hem_criteria =[[my['hem'],my['total_leg']/11],
                [my['calf'],my['total_leg']/3],
                [my['knee'],my['total_leg']/2],
                [my['thigh'],my['crotch_height']]
                ];

function dynamic_hem(pant){
            var noPantLen = my['total_leg']-pant; //옷이 없는 부분
            console.log(noPantLen)
            for(i = 0; i<hem_criteria.length; i++){
            if (noPantLen<hem_criteria[0][1]){return hem_criteria[0][0]}
            else if (noPantLen<hem_criteria[i][1]){
                var a = (hem_criteria[i][1]-hem_criteria[i-1][1])/(hem_criteria[i][0]-hem_criteria[i-1][0]);
                var b = hem_criteria[i][1] - a*hem_criteria[i][0]; // y-ax = b
                console.log(i,a,b)
                return (noPantLen - b)/a }//x 구하기
            else {continue;}
            }};

