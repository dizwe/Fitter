function engToKor(param){
    var engKor= {'length':'길이','shoulder':'어깨','waist':'배','chest':'가슴','sleeve':'소매',
           'bot_length':'기장','bot_waist':'허리','thigh':'허벅지','crotch':'밑위','hem':'밑단','hip':'엉덩이'};

    return engKor[param]
}

function fitCal(calData, big_criteria=20, too_criteria=50){
    var info = {'small': [] ,'fit': [],'big': [],'too':[],'exception':[]};
        var excepts = ['길이','기장','소매','배','밑단'];

    function pushAndExcept(size,param){
        //클로저 자료는 넣고, except가 있다면 except size따로 파악
        var korParam = engToKor(param);
        info[size].push(korParam);
        for (index in excepts){
            if (korParam.indexOf(excepts[index])!= -1){
                info['exception'].push(size);
            }
        }
    }

    function countWithExcept(size){
        var except_num = 0;
        for (var index=0; index<info['exception'].length;index++){
            if (info['exception'][index]===size){
                except_num +=1;
            }
        }
        return info[size].length-except_num
    }


    for (param in calData){
        var value = calData[param];
        if (value<0){
            pushAndExcept('small',param);
        }else if(value>big_criteria && value<=too_criteria){
            pushAndExcept('big',param);
        }else if(value>too_criteria){
            pushAndExcept('too',param);
        }else{
            pushAndExcept('fit',param);
        }
    }

    if (countWithExcept('small')>0){
       conclusion = "작아요:(";
    }else if(countWithExcept('too')>0){
       conclusion = "커요~";
    }else if(countWithExcept('big')>0){
       conclusion = "넉넉해요";
    }else{
       conclusion = "몸에 딱 붙어요.";
    }

    info['conclusion'] = conclusion; // add conclusion
    return info
};

// MAIN
if (clothes_type ==='top'){
    var divided_param =fitCal(topCal);}
else if(clothes_type ==='bot'){
    if (botCal['hip']===0){// 엉덩이는 없으면 분석에서 뺀다
        delete botCal['hip'];
    }
    var divided_param =fitCal(botCal);
}

$(document).ready(function(){
    var target = document.getElementsByClassName('anal')[0];
    target.innerHTML += "<p class ='anal-head'>[FIT=해당 부위 옷 길이-몸 길이]</p>";
    if(divided_param['small'].length>0){
        target.innerHTML += "<p><span  class = 'anal-description'>"
                            + "<span class ='anal-li block'>옷이 작은 부분</span>(FIT&lt;0) : </span>"
                            + divided_param['small']+"</p>";

    }
    if(divided_param['fit'].length>0){
//        target.innerHTML += "<p class = 'anal-description'> 옷이 끼거나 딱 맞는 부분<span class ='block'>(0&lt;FIT&lt;2cm) :</span></p>";
//        target.innerHTML += "<p>"+divided_param['fit']+"</p>";
        target.innerHTML += "<p><span  class = 'anal-description'>"
                            + "<span class ='anal-li block'>옷이 끼거나 딱 맞는 부분</span>(0&lt;FIT&lt;2cm) : </span>"
                            + divided_param['fit']+"</p>";
    }
    if(divided_param['big'].length>0){
//        target.innerHTML += "<p class = 'anal-description'> 옷이 넉넉한 부분<span class ='block'>(2&lt;FIT&lt;5cm) :</span></p>";
//        target.innerHTML += "<p>"+divided_param['big']+"</p>";
        target.innerHTML += "<p><span  class = 'anal-description'>"
                            + "<span class ='anal-li block'>옷이 넉넉한 부분</span>(2&lt;FIT&lt;5cm) :  </span>"
                            + divided_param['big']+"</p>";
    }
    if(divided_param['too'].length>0){
//        target.innerHTML += "<p class = 'anal-description'> 옷이 큰 부분<span class ='block'>(5cm&lt;FIT) :</span></p>";
//        target.innerHTML += "<p>"+divided_param['too']+"</p>";
        target.innerHTML += "<p><span  class = 'anal-description'>"
                            + "<span class ='anal-li    block'>옷이 큰 부분 </span>(5cm&lt;FIT) : </span>"
                            + divided_param['too']+"</p>";
    }
    target.innerHTML += "<p class ='conclusion'><span class ='anal-li'>종합 추측하면, </span> "
                        +divided_param['conclusion']+"</p>";

});
