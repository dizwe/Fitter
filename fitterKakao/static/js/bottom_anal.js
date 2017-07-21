function engToKor(param){
    var engKor= {'length':'길이','shoulder':'어깨','waist':'배','chest':'가슴','sleeve':'소매',
           'bot_length':'기장','bot_waist':'허리','thigh':'허벅지','crotch':'밑위','hem':'밑단','hip':'엉덩이'};

    return engKor[param]
}

function fitCal(calData, criteria=20){
    var info = {'small': [] ,'fit': [],'big': [],'exception':[]};
    var excepts = ['길이','기장','소매'];

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
        console.log(param,value, criteria)
        if (value<criteria*-1){
            pushAndExcept('small',param);
        }else if(value>criteria){
            pushAndExcept('big',param);
        }else{
            pushAndExcept('fit',param);
        }
    }

    if (countWithExcept('small')>0){
       conclusion = "작아요ㅜㅜ";
    }else if(countWithExcept('big')>0){
       conclusion = "좀 넉넉해요";
    }else{
       conclusion = "완전히 잘 맞아요.";
    }

    info['conclusion'] = conclusion; // add conclusion
    return info
}

var divided_param =fitCal(botCal);

$(document).ready(function(){
    var target = document.getElementsByClassName('anal')[0];
    target.innerHTML += "<p>"+divided_param['conclusion']+"</p>";
    if(divided_param['small'].length>0){
        target.innerHTML += "<p>"+divided_param['small']+" 좀 작아요</p>";
    }
    if(divided_param['fit'].length>0){
        target.innerHTML += "<p>"+divided_param['fit']+" 잘 맞아요!</p>";
    }
    if(divided_param['big'].length>0){
        target.innerHTML += "<p>"+divided_param['big']+" 좀 커요</p>";
    }
});
