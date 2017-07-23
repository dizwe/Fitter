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
        console.log(sel, tog);

        $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
        $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
    }

})

//add_clothes
$(document).ready(function(){
    $('#hip_check').change(function(){
        console.log(this)
        if(this.checked){
            $('#hip').hide();
            $('#hip').next().hide();}
        else{
            $('#hip').show();
            $('#hip').next().show();}

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