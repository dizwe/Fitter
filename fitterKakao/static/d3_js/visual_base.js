var shirt = test_shirt;
//cm를 mm로 바꾸기
for (var key in shirt){
    shirt[key] *= 10;
}

var pant = test_pants;
for (var key in pant){
    pant[key] *= 10;
};

var tall = 1000; //키기준
var broad = 700; //어깨기준
var real_tall = real_tall*10;
var real_broad = suggest_body['shoulder']*2;

function mmToCm(mm){
    cm = Math.round(mm/10);
    return cm
}

//function valueToNumber(data){
//  for (key in data){
//    data[key] = Number(data[key]);
//  }
//  return data;
//}
//valueToNumber(one_body); //물음: 여기서는 클로저가 되어서 one_body 자료가 바뀌는건가?

function realTallToRatio(real_value){
  return tall- tall*(real_value-real_tall)/real_tall*2;
}

function realBroadToRatio(real_value){
  return broad * real_value/real_broad;
}
var clothes_color = "#74c476"
var my = {
  'trunk_leg' : real_tall-150, //목높이
  'shoulder' : suggest_body['shoulder'],
  'arm_len' : suggest_body['arm'],
  'chest' : suggest_body['chest']/3.14,
  'waist' : suggest_body['waist']/3.14,
  'chest_half' : suggest_body['chest']/2,
  'waist_half' : suggest_body['waist']/2,
  'nipple_half' : suggest_body['nipple']/2,
  'crotch_height' : suggest_body['crotch_height'],
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

// 바지길이가 달라질때마다 달라지는 hem 길이 반영
var hem_criteria =[[my['hem'],my['total_leg']/11],
                [my['calf'],my['total_leg']/3],
                [my['knee'],my['total_leg']/2],
                [my['thigh'],my['crotch_height']]
                ];

function dynamic_hem(pant){
            var noPantLen = my['total_leg']-pant; //옷이 없는 부분
            for(i = 0; i<hem_criteria.length; i++){
            if (noPantLen<hem_criteria[0][1]){return hem_criteria[0][0]}
            else if (noPantLen<hem_criteria[i][1]){
                var a = (hem_criteria[i][1]-hem_criteria[i-1][1])/(hem_criteria[i][0]-hem_criteria[i-1][0]);
                var b = hem_criteria[i][1] - a*hem_criteria[i][0]; // y-ax = b
                console.log(i,a,b)
                return (noPantLen - b)/a }//x 구하기
            else {continue;}
            }};
