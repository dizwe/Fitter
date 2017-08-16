//index
$(window).ready(function () {
    if (window.matchMedia('(min-width: 768px)').matches) {
           $('#input').removeAttr('viewBox');
           $('#input').each(function () { $(this)[0].setAttribute('viewBox', '0 0 16 16') });
    }else{
        $('#input').removeAttr('viewBox');
        $('#input').each(function () { $(this)[0].setAttribute('viewBox', '0 4 16 9') });
    }});

$(window).resize(function () {
    if (window.matchMedia('(min-width: 768px)').matches) {
           $('#input').removeAttr('viewBox');
           $('#input').each(function () { $(this)[0].setAttribute('viewBox', '0 0 16 16') });
    }else{
        $('#input').removeAttr('viewBox');
           $('#input').each(function () { $(this)[0].setAttribute('viewBox', '0 4 16 9') });
    }});

//post_new
$('#radioBtn a').on('click', function(){
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    $('#'+tog).prop('value', sel);
    
    $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
    $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
})

$(document).ready(function(){
    var btn = $('.btn-group');
    for (var i =0; i<btn.length; i++){
        var select_a = $(btn[i]).find('a');

        var tog = select_a.data('toggle');
        var sel = $('#'+tog).val();


        $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
    }

})

//add_clothes
$(document).ready(function(){
    $('#hip_check').change(function(){
        if(this.checked){
            $('.hip_check').attr('checked','checked');
            $('.hip').hide();
            $('.hip').next().hide();}
        else{
            $('.hip_check').attr('checked','false');
            $('.hip').show();
            $('.hip').next().show();}

    });

    $('#same_photo-stay').change(function(){
        if(this.checked){
            $('.same_photo-stay').attr('checked','checked');
            $('.photo-change').hide();
            }
        else{
            $('.same_photo-stay').attr('checked','false');
            $('.photo-change').show();
            }

    });
});


//clothes
//삭제하기
$(document).ready(function(){
    $('.deleteClothes').on('click',function(e){
        var returnValue = confirm("진짜 지울거에요?");
        if (!returnValue){
            return false
        }

    });
});

//$(document).ready(function() {
//    $('.nailthumb-container').nailthumb();
//});
// 해시태그 보고 버튼 들어가기
$(document).ready(function(){
    var hash = window.location.hash;
    if (hash ==="#top-clothes"){

    $('#top-nav').attr('class','active');
    $('#bot-nav').removeAttr('class');
    $("#top-clothes").attr('class','tab-pane active');
    $("#bot-clothes").attr('class','tab-pane');
    }else{

    $('#bot-nav').attr('class','active');
    $('#top-nav').removeAttr('class');
    $("#top-clothes").attr('class','tab-pane');
    $("#bot-clothes").attr('class','tab-pane active');
    }
});

//버튼 누르면 해시태그 만들기
$('#top-tab').on('click', function(){
    document.location.hash = "top-clothes";
})

$('#bot-tab').on('click', function(){
    document.location.hash = "bot-clothes";
})

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

//    var edge = ua.indexOf('Edge/');
//    if (edge > 0) {
//       // Edge (IE 12+) => return version number
//       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
//    }

    // other browser
    return false;
}
$(document).ready(function(){
    if(detectIE()){ //
        var svg = $('div.visual svg').removeAttr('viewBox');

        if (clothes_type ==='top'){
            svg.attr('height','550px');
            svg.attr('width','300px');
        }else if(clothes_type ==='bot'){

            svg.attr('height','500px');
            svg.attr('width','100%');
    }}})

//single_post
$(document).ready(function(){
    var url = location.pathname;
    if(url.indexOf('top')>-1){//top 있으면
        $('.single-bot').hide()
    }else if(url.indexOf('bot')>-1){//bot 있으면
        $('.single-top').hide()
    }

});

// input text 누르면 내용 사라지게 하기

    $('input:text').focus(function(){
        if ($(this).val()==='Untitled' ||$(this).val()==='FREE'){
            $(this).val('');
        }});
    $('input[type="number"]').focus(function(){
        if ($(this).val()==='0'){
            $(this).val('');}
    });
//number는 안됨
