$(document).ready(function(){
    function updateElementIndex(el, prefix, ndx){
        var id_regex = new RegExp('('+prefix+'-\\d+-)');
        var replacement = prefix + '-' + ndx + '-';
        //<label for="id_form-0-nick">
        if ($(el).attr("for")) $(el).attr("for",
                                          $(el).attr("for").replace(id_regex, replacement));

        //<input id="id_sleeve" name="sleeve" step="any" type="number" value="0" required="">
        if (el.id) el.id = el.id.replace(id_regex, replacement);
        if (el.name) el.name = el.name.replace(id_regex, replacement);

    }

    function deleteForm(btn, prefix) {
        var formCount = parseInt($('#id_' + prefix + '-TOTAL_FORMS').val());
        if (formCount > 1){
            $(btn).parents('.item').remove();
            var forms = $('.item'); // GET All the forms.
            $('#id_' + prefix + '-TOTAL_FORMS').val(forms.length);
            var i = 0;
            for (formCount = forms.length; i < formCount; i++){
                $(forms.get(i)).children().children().each(function () { // 한 필드 접근
                    if ($(this).attr('type') === 'text'){updateElementIndex(this, prefix, i);}
                });
            }
        }
        else {
            alert("한 폼 이상은 있어야지!")
        }
    }

    function addForm(btn, prefix) {
        var formCount = parseInt($('#id_'+ prefix + '-TOTAL_FORMS').val()); // total_form id의 value 값 구함

        if (formCount < 4){
            //첫번째 formset에서 복사ㅏ
            var row = $(".item:first").clone(false).get(0) //처음거 가져오기
            $(row).removeAttr('id').hide().insertAfter(".item:last").slideDown(300);

            //필요없는거 지우기
//            $(".errorlist", row).remove();
//            $(row).children().removeClass("error");

            $(row).children().children().each(function(){
                updateElementIndex(this, prefix, formCount);

                if($(this).attr('id')){ //nick은 남겨두기
                    if($(this).attr('id').indexOf('nick')>-1){
                        $(this).parent().attr('class','all-nick hiding');
                        console.log($("input #id_form-0-size").val());
                    }else if($(this).attr('id').indexOf('photo')>-1){
                        $(this).parent().attr('class','all-clothes hiding');
                    }else{
                        $(this).val("0");
                    }
                }
            });

            $(row).find(".delete").click(function(){
                return deleteForm(this, prefix);
            });

            $("#id_" + prefix + "-TOTAL_FORMS").val(formCount + 1);

        }else{
            alert("이미 많이 만들었쟈나~ 한계야!");
        }
        return false;
    }

    $("#add").click(function(){
        return addForm(this, "form");
    });

    $(".delete").click(function(){
        return deleteForm(this, "form");
    });
})

$(document).ready(function(){
$('#id_form-0-nick').change(function(){
    var prefix = "form";
    var param = "nick";
    console.log('start');
    var formCount = parseInt($('#id_'+prefix+'-TOTAL_FORMS').val()); // total_form id의 val 값
    for (i=1;i<formCount;i++){
        console.log(i);
        var clone = $(this).clone(); // 첫번재거 복사
        clone.attr('id','id_form-'+i+'-'+param);
        clone.attr('name','id_form-'+i+'-'+param);
        $('#id_'+prefix+'-'+i+'-'+param).parent().html(clone);
    }

})
})
//#('#id_form-0-photo')