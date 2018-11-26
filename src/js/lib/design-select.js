
/**
 * 디자인 셀렉트박스
 */

$('.design-select').each(function(){

    if ( $(this).parent('.designSelectWrap').find('.select-content').length > 0 ) return;

    /*reset*/
    var _that = $(this);
    var _thatTitle = _that.attr('title');
    $(this).hide();
    $(this).wrap('<div class="designSelectWrap" />');
    var selectW = $(this).parent('.designSelectWrap');
    selectW.append('<div class="select-content" />');
    var selectC = selectW.find('.select-content');
    selectC.append('<div class="select-title"><a href="#"></a></div>');
    selectC.append('<ul class="select-list" />');
    var selectT = selectW.find('.select-title > a');
    if (_thatTitle){
        selectT.attr('title',_thatTitle);
    }
    var selectL = selectW.find('.select-list');
    if ($(this).find(' option:selected')){
        selectT.text($(this).find('option:selected').text());
    }else{
        selectT.text($(this).find('option').eq(0).text());
    }
    var selectOption = $(this).find('option');
    selectOption.each(function(){
        var optionText = $(this).text();
        selectL.append('<li><a href="#">' + optionText + '</a></li>')
    });
    selectL.find('li').eq(0).addClass('first');
    selectL.find('li').last().addClass('last');
    selectL.hide();

    /*event handler*/
    selectT.on('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        var selectBox = $(this).parent().parent().parent().parent('.design-select-box');
        if ($(this).parent().next().is(':visible')){
            $(this).parent().next().hide();
            selectBox.css('z-index',5);
        }else{
            $('.select-list').hide();
            $(this).parent().next().show();
            $('.design-select-box').css('z-index',5);
            selectBox.css('z-index',10);
        }
        $(window).click(function(){
            selectL.hide();
            $(window).unbind('click');
            selectBox.css('z-index',5);
        })
    });
    selectT.on('keydown',function(e){
        if (e.keyCode == 9 && $(this).next().parent().is(':visible')){
            $(this).parent().next().find('a').eq(0).focus();
            return false;
        }else if (e.keyCode == 27){
            $(this).parent().next().hide();
            $(this).focus();
        }else{
            return true;
        }
    });
    selectW.find('.select-list a').on('click',function(e){
        e.preventDefault();
        var $text = $(this).text();
        var $index =$(this).parent().parent().find('li').index($(this).parent());
        _that.find('option').removeAttr('selected');
        _that.find('option').eq($index).prop('selected','selected');
        $(this).parent().parent().parent().find('.select-title').find('a').text($text).focus();
        $(this).parent().parent().hide();
        $(this).parent().parent().parent().parent().parent().next().addClass('on');
        if (_that.attr('onchange')){
            _that.trigger('onchange');
        }else{
            _that.trigger('change');
        }
    });
    $('.select-list').find('a').on('keydown',function(e){
        if (e.shiftKey && e.keyCode == 9) {
            if ($(this).parent().attr('class') == 'first'){
                $(this).parent().parent().find('li').last().find('a').focus();
                return false;
            }
        }else if (e.keyCode == 9){
            if ($(this).parent().attr('class') == 'last'){
                //$(this).parent().parent().find('li').eq(0).find('a').focus();
                $(this).parent().parent().hide();
                $(this).parent().parent().prev().find('a').focus();
                return false;
            }
        }else if (e.keyCode == 27){
            $(this).parent().parent().hide();
            $(this).parent().parent().parent().find('.select-title').find('a').focus();
            return false;
        }else{
            return true;
        }
    });

});