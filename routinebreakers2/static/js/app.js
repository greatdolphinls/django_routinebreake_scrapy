function setScrollBar(){
    $('.sortBtn .sort_list').mCustomScrollbar({
        theme:'gray-theme',
        scrollEasing:'linear',
        scrollInertia:300,
    });
    $('.more-flight-popup').mCustomScrollbar({
        theme:'gray-theme',
        scrollEasing:'linear',
        scrollInertia:300,
        autoHideScrollbar: true,
    });
}

function sortDropdown(){
    var sortBtn = $('.sortBtn');
    var regionSortBtn = $('.sortBtn[data-sort="region"]');
    var citySortBtn = $('.sortBtn[data-sort="city"]');
    var subRegions = regionSortBtn.find('.sub_regions');
    var regionText = '';
    var subRegionText = '';
    regionSortBtn.show();

    regionSortBtn.find('li').click(function(ev){
        ev.stopPropagation();
        if($(this).hasClass('subRegions')){
        	regionText = $(this).text();
            subRegions.show();        
        } else{
            citySortBtn.show();
        }
    });
    subRegions.find('li').click(function(){
    	subRegionText = $(this).text();
        subRegions.hide();        
        citySortBtn.show();
        var text = regionText + ", " + subRegionText;
        regionSortBtn.find('.sort_placeholder').text(text);
    });
    $('.sort_placeholder').click(function(ev){
        ev.stopPropagation();
        var selector = $(this).closest('.sortBtn');
        if(selector.hasClass('open')){
            selector.removeClass('open');
        }else{
            $('.sort_placeholder').each(function(index,item){
                $(item).closest('.sortBtn').removeClass('open');
            });
            selector.addClass('open');
        }
    });
    $('.sortBtn .x').click(function(e){
        e.stopPropagation();
        $('.sort_placeholder').click();
    });
    $('.sort_list li').click(function(){
        $(this).closest('.sortBtn').find('.sort_placeholder').text($(this).text());
        $(this).closest('.sortBtn').removeClass('open');
    });
    $('body').on('click touchstart',function(){
        sortBtn.removeClass('open');
        subRegions.hide();
    });
}

function flightListDropdown(){
    var list = $('.flight_list_section .list');
    var moreList = $('.list-section .moreBtn');
    var input = $('.log-section.b .log_box input');
    var moreDatesBtn = $('.flight_list_section .list .more_dates');

    list.not('.unselectable').click(function(ev){ 
        ev.stopPropagation();
        $(this).find('.flight_details').stop().slideToggle('fast');
        $(this).toggleClass('active');
        $('.flight_list_section .flight_details .details').on('click touchstart', function(ev){
            ev.stopPropagation();
        });
        $('body').on('click touchstart',function(){
            $(this).find('.flight_details').stop().slideUp();
            list.removeClass('active')
        });
    });
    if(list.hasClass('unselectable')){ //only if list has class "unselectable"
        var scrollTo = (input.offset().top);//bottom email register container
        
        list.click(function(){
            $('html, body').animate({
                scrollTop: scrollTo,
            },600);
            input.addClass('required');
        });
        input.focus(function(){
            $(this).removeClass('required');
        });
    }
    moreDatesBtn.click(function(ev){ //more flights popup
        ev.preventDefault();
        ev.stopPropagation();
        
        $('.more-flight-popup').fadeIn();

        $('.more-flight-popup').click(function(ev){
            ev.stopPropagation();
        });
        $('body').on('click touchstart', function(){
            $('.more-flight-popup').fadeOut();
        });
    });
    
    moreList.click(function(ev){ // show Unlock more button
        ev.preventDefault();
        $(this).hide();
        $('.bluded_lists').fadeIn();
    });
    $('.more-flight-popup .cls').click(function(){
        $('.more-flight-popup').fadeOut();   
    });
}

function travelLoversHover(){
    $('.travelers-section .t_box .t_active').hover(function(){
        $('.travelers-section .t_box').removeClass('active');
        $(this).closest('.t_box').addClass('active');
    }, function(){
        $(this).closest('.t_box').removeClass('active');
    });
}

function userRegister(){
    var container = $('.user-section');
    var bullet = $('.bullets span');

    container.eq(0).show();
    $('.user-section button.nextBtn').click(function(e){
        e.preventDefault();
        var attrib = $(this).attr('data-next');

        container.hide();
        $('#'+attrib).show();
    });

    $(document).on("keypress", "form", function(event) { 
        return event.keyCode != 13;
    });
}

function taggableInput(input){ //Taggable inputs
    var arr = [];
    try{
        arr = JSON.parse(input.attr('data-whitelist'));
    }catch(e){

    }
    tagify = new Tagify(input.get(0), {
        enforceWhitelist : true,
        whitelist : arr,
    });
    tagify.on('add', onAddTag);

    function onAddTag(e){
        tagify.off('add', onAddTag) 
    }
}
function taggable(){ //call Taggable inputs
    taggableInput($('.departure_tags'));
    taggableInput($('.destination_tags'));
}

function dealsShow(){
    var button = $('.deal_nav .dealBtn');
    var container = $('.deal-container');
    container.eq(0).show();

    button.click(function(){
        button.removeClass('active');
        $(this).addClass('active');
        attr = $(this).attr('data-show');

        container.hide();
        
        $('.deal-container[data-show="'+attr+'"]').show();
        if($('.dealBtn[data-show="partners-deals"]').hasClass('active')){
            $('.deal_nav ._rb').hide();
        }
        else{
            $('.deal_nav ._rb').show();
        }
    });
}

function showUpgradePopup(){
    function showPopup(){
        var popup = $('.upgrade-popup');
        var scrollTo = (popup.offset().top);

        popup.addClass('active');
        popup.click(function(ev){
            ev.stopPropagation();
        });
        $('body').on('click touchstart' ,function(){
            popup.removeClass('active');
        });
        $('html, body').animate({
            scrollTop: scrollTo,
        },300);
        popup.on('click touchstart', function(ev){
            ev.stopPropagation();
        });
    }
    var loader = $('.loader');
    var loadingTime = .3;//sec
    loader.addClass('active');
        setTimeout(function(){
        loader.removeClass('active');
        showPopup();
    },loadingTime*1000);
}

function upgradePopup(){
    $('.unlockBtn').click(function(){
        showUpgradePopup();
    });
    $('.sortBtn[data-sort="city"]').click(function(){
        showUpgradePopup();
    });
    $('.membership_container .offers .blBtn').click(function(){
        showUpgradePopup();
    });
    $('.partners_list .list .dealBtn').click(function(){
        showUpgradePopup();
    });
}

function resendEmail(){
    $('.resendBtn').click(function(ev){
        ev.preventDefault();
        $(this).addClass('visited');
        $('.email-section .resend').fadeIn();
    });
}
