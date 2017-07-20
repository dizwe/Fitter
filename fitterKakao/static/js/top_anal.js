function engToKor(param){
    var engKor= {'length':'길이','shoulder':'어깨','waist':'배','chest':'가슴','sleeve':'소매',
           'bot_length':'기장','bot_waist':'허리','thigh':'허벅지','crotch':'밑위','hem':'밑단','hip':'엉덩이'};

    return engKor[param]
}

function fitCal(calData, criteria=20){
    var small = [];
    var fit = [];
    var big = [];
    var excepts = ['길이','기장','소매'];

    for (param in calData){
        var value = calData[param];
        var param = engToKor(param);

        if (value<criteria*-1){
            small.push(param);
//            if (param.indexOf(excepts)!=)
        }else if(value>criteria){
            big.push(param);
        }else{
            fit.push(param);
        }
    }

//    var excepts = ['길이','기장','소매'];
//    var con_info = {'small': small ,'fit': fit,'big': big};
//    var excepts_num = [];
//    for (except in excepts){
//        for (param in con_info){
//            exist = con_info[param].indexOf(except);
//            if(exist!=-1){
//                excepts_num.push(param);
//            }
//        }
//    }


    if (small.length>0){
       conclusion = "작아요ㅜㅜ"
    }else if(big.length>0){
       conclusion = "좀 넉넉해요"
    }else{
       conclusion = "완전히 잘 맞아요."
    }
    return {'small': small ,'fit': fit,'big': big,'conclusion':conclusion}
}

//var divided_param =fitCal(botCal);
var divided_param =fitCal(topCal);

$(document).ready(function(){
    var target = document.getElementsByClassName('anal')[0];
    target.innerHTML += "<p>"+divided_param['conclusion']+"</p>";
    if(divided_param['small'].length>0){
        target.innerHTML += "<p>"+divided_param['small']+"가 좀 작아요</p>";
    }
    if(divided_param['fit'].length>0){
        target.innerHTML += "<p>"+divided_param['fit']+"가 잘 맞아요!</p>";
    }
    if(divided_param['big'].length>0){
        target.innerHTML += "<p>"+divided_param['big']+"가 좀 커요</p>";
    }
});
