function suggestionCal(data, remaining_num){
    return mmToCm(data)+remaining_num
}

var data = {
  labels: [
    '전체길이', '어깨', '가슴',
    '배', '소매'
  ],
  series: [
    {
      label: '옷 길이',
      values: [test_shirt['len'], test_shirt['shoulder'], test_shirt['chest'], test_shirt['chest'], test_shirt['sleeve']].map(mmToCm)
    },
    {
      label: '몸 길이',
      values: [real_tall*2-suggest_body['crotch_height'], suggest_body['shoulder'] , suggest_body['chest']/2, suggest_body['waist']/2, suggest_body['arm']].map(mmToCm)
    },
    {
      label: '추천 길이',
      values: [real_tall*2-suggest_body['crotch_height'], suggest_body['shoulder'] , suggest_body['chest']/2, suggest_body['waist']/2, suggest_body['arm']].map(function(x) { return suggestionCal(x, 2); })
    },]
};