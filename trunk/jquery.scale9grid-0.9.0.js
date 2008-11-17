/*
 * jQuery 9-Grid Scaling Plugin 0.9.0
 *
 * Copyright (c) 2008 Gordon L. Hempton ( http://hempton.com )
 * Licensed under the MIT license
 */
(function($) {

$.fn.scale9Grid = function(grid) {
	
	var gridTop = grid.top || 0;
	var gridBottom = grid.bottom || 0;
	var gridLeft = grid.left || 0;
	var gridRight = grid.right || 0;

	$(this).each(function() {
		
		var $target = $(this);
		var backgroundImage = $target.css('background-image');
		var match = /url\("?([^\(\)"]+)"?\)/i.exec(backgroundImage);
		if(!match || match.length < 2) {
			return;
		}
		var backgroundUrl = match[1];
		
		var paddingLeft = $target.css('padding-left');
		var paddingRight = $target.css('padding-left');
		var paddingTop = $target.css('padding-top');
		var paddingBottom = $target.css('padding-bottom');
		var textAlign = $target.css('text-align');
		
		$target.css({
			'background-color':'transparent',
			'background-image':'none',
			'border-color':'transparent',
			'padding':'0',
			'text-align':'left'
		});
		
		$target.wrapInner('<div class="s9gwrapper"></div>');
		var $wrapper = $target.find('.s9gwrapper');
		$wrapper.css({
			'position':'relative',
			'padding-left':paddingLeft,
			'padding-right':paddingRight,
			'padding-top':paddingTop,
			'padding-bottom':paddingBottom,
			'text-align':textAlign,
			'z-index':'2',
			'display':'block'
		})
		
		var backgroundElement = document.createElement('div');
		$target.prepend(backgroundElement);
		var $background = $(backgroundElement);
		$background.css({
			'position':'relative',
			'width':'0px',
			'height':'0px',
			'z-index':'0',
			'display':'block'
		});
		
		var image = new Image();
		
		var layoutGrid = function() {
			var width = $target.innerWidth();
            var height = $target.innerHeight();
            var imageWidth = image.width;
            var imageHeight = image.height;
            
            // TODO: optimize this by reusing existing divs
            $background.find('.s9cell').remove();
            
            var innerWidth = width - gridRight;
            var innerHeight = height - gridBottom;
            
            for(var y = 0; y < height;)
            {
            	var cellHeight;
            	if(y < innerHeight) {
            		var maxCellHeight = y == 0 ? imageHeight - gridBottom : imageHeight - gridBottom - gridTop;
            		cellHeight = Math.min(maxCellHeight, innerHeight - y);
            	}
            	else
            		cellHeight = gridBottom;
            	for(var x = 0; x < width;)
            	{
            		var cellElement = document.createElement('div');
            		$background.append(cellElement);
            		var $cell = $(cellElement);
            		
            		var cellWidth;
            		if(x < innerWidth) {
            			var maxCellWidth = x == 0 ? imageWidth - gridRight : imageWidth - gridRight - gridLeft;
            			cellWidth = Math.min(maxCellWidth, innerWidth - x);
            		}
            		else
            			cellWidth = gridRight;
            		
            		// set the background position property
            		var backgroundPosition;
            		var left = x == 0;
            		var right = x + cellWidth >= width;
            		var top = y == 0;
            		var bottom = y + cellHeight >= height;
            		
            		if(left && top) {
            			backgroundPosition = 'top left';
            		}
            		else if(left && bottom) {
            			backgroundPosition = 'bottom left';
            		}
            		else if(right && top) {
            			backgroundPosition = 'top right';
            		}
            		else if(right && bottom) {
            			backgroundPosition = 'bottom right';
            		}
            		else if(left) {
            			backgroundPosition = 'center left';
            		}
            		else if(right) {
            			backgroundPosition = 'center right';
            		}
            		else if(top) {
            			backgroundPosition = 'top center';
            		}
            		else if(bottom) {
            			backgroundPosition = 'bottom center';
            		}
            		else {
            			backgroundPosition = 'center center';
            		}
            		
            		$cell.css({
            			'position':'absolute',
            			'left':x + 'px',
            			'top':y + 'px',
            			'overflow':'hidden',
            			'width':cellWidth + 'px',
            			'height':cellHeight + 'px',
            			'background-image':backgroundImage,
            			'background-position':backgroundPosition
            		});
            		$cell.addClass('s9cell');
            		
            		x += cellWidth;
            	}
            	y += cellHeight;
            }
		};
		
		$(image).load(function() {
			layoutGrid();
			// TODO: we should resize when the text size is changed also
			$(window).resize(layoutGrid);
		}).attr('src', backgroundUrl);
		
	});
	
};
	
})(jQuery);