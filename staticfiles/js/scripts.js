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
function hide_b(btn){
    if($(btn).attr('checked') ==="checked"){
        $('#hip').parent().show();
        $(btn).removeAttr('checked');
    }else{
        $(btn).attr('checked',"checked");
        console.log(btn);
        $('#hip').parent().hide();
    }


}

//$(document).ready(function(){
//    $('#hip_check').change(function(){
//        if(this.checked)
//            $('#hip').parent().show();
//        else
//            $('#hip').parent().hide();
//
//    });
//});