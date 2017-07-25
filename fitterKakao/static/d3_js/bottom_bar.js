var data = {
  labels: [
    '기장&무릎', '허리', '허벅지',
    '밑단', '밑위', '엉덩이'
  ],
  series: [
    {
      label: '몸 길이',
      values: [suggest_body['length'], suggest_body['bottom_waist']/2 , suggest_body['thigh']/2,
               suggest_body['hem']/2, suggest_body['crotch'], suggest_body['hip']/2].map(mmToCm),
    },
    {
      label: '옷 길이',
      values: [pant['length'], pant['waist'], pant['thigh'], pant['hem'], pant['crotch'], pant['hip']].map(mmToCm),
    },
    {
      label: '두번째 몸 길이',
      values: [suggest_body['length']/2, 0,0,0,0,0].map(mmToCm),
    },]
};
