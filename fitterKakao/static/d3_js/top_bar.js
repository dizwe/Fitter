function suggestionCal(data, remaining_num){
    return mmToCm(data)+remaining_num
}

var data = {
  labels: [
    '가랑이/배꼽', '어깨', '가슴/배', '긴팔/반팔'
  ],
  series: [
    {
      label: '몸 길이',
      values: [real_tall*2-suggest_body['crotch_height'], suggest_body['shoulder'] , suggest_body['chest']/2, suggest_body['arm']].map(mmToCm)
    },
    {
      label: '옷 길이',
      values: [test_shirt['len'], test_shirt['shoulder'], test_shirt['chest'], test_shirt['sleeve']].map(mmToCm)
    },
    {
      label: '몸 길이2',
      values: [12, 0, suggest_body['waist']/2, suggest_body['arm']/2].map(mmToCm)
    },]
};