function gradientWall($elem, colors, freq) {
    
    var animateBackward = function(){
        $elem.animate({'background-position-y': '0%'}, freq, 'linear', function(){animateForward()});
    }
    var animateForward = function(){
        $elem.animate({'background-position-y': "100%"}, freq, 'linear', function(){animateBackward();});
    }
    
    gradText = "linear-gradient(" + colors.toString() + ")";
    $.each(['', '-o-', '-moz-', '-webkit-', '-ms-'], function() {
        $elem.css({ 'background': this + gradText });
    });
    $elem.css({'background-size' : '1% ' + colors.length * 100 + '%'});
    animateForward();
}

var defaultColors = ['#87FC70', '#55EFCB', '#5BCAFF', '#1AD6FD'];           
var defaultFreq = 5000;
   
gradientWall($('#your-container'), defaultColors, defaultFreq);

$('#freq-input').val(defaultFreq/1000);

function attachDelete() {
	var $lastColor = $('.colors').last();
	$lastColor.find('.delete-color').on('click', function(){
		$(this).parent().remove();
	});
}

function addInactiveColor() {
	$('.colors').append(
			'<div class="color-block inactive">' +
			'<a class="delete-color">x</a>' +
			'<input class="colors-input" type="text" value="add" /></div>');
	$spec = $('.colors-input', $('.color-block.inactive'));
	attachSpectrum($spec);
	attachDelete();
}

function attachSpectrum($spec) {
	$spec.spectrum({
			showInput: true,
			hide: function(color) {
				if($(this).val() == 'add') {
					return;
				}
				$parent = $(this).parent();
                $parent.css('background-color', color);
                if($parent.hasClass('inactive')) {
                	$parent.removeClass('inactive');
                	$parent.addClass('active');
                	addInactiveColor();	
                }
            }
		});
	$spec.show();
}

function populateColors(colors) {
	$.each(colors, function() {
		$('.colors').append(
			'<div class="color-block active"' +
			'style="background-color: ' + this + '">' + 
			'<a class="delete-color">x</a>' +
			'<input class="colors-input" type="text" value="' + this + '" /></div>');
		attachDelete();	
	});
	
	addInactiveColor();			
	
	$('.color-block.active').each(function(){
		$spec = $('.colors-input', this);
		attachSpectrum($spec);
	});
}

populateColors(defaultColors);

function refreshSettings(){
	var freq = parseFloat($('#freq-input').val()) * 1000;
	var colors = [];
	$('.active').each(function(){
		colors.push($('input', this).val());
	});
	$('#your-container').stop();
	gradientWall($('#your-container'), colors, freq);
}

$('.edit-button').on('click', function(){
	if ($(this).hasClass('on')) {
		$('.panel').animate({ 'margin-left' : '-12em' });
		refreshSettings();
		$(this).text('edit');
		$(this).removeClass('on');
	} else {
		$('.panel').animate({ 'margin-left' : '0em' }); 
		$(this).addClass('on');
		$(this).text('done');
	}		
}); 