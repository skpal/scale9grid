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
		
		// ie6 breaks on a floated child with a staticly positioned parent
		if($.browser.msie && $.browser.version < 7 && $target.css('float') != 'none' && $target.css('position') == 'static') {
			$target.css('position', 'relative');
		}
		
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
		
		var imageWidth;
		var imageHeight;
		
		var lastWidth = 0;
		var lastHeight = 0;
		
		var cells = new Array();
		
		var layoutGrid = function() {
			var width = $target.innerWidth();
            var height = $target.innerHeight();
            
            if(width < gridLeft + gridRight || height < gridTop + gridBottom
            		|| (width == lastWidth && height == lastHeight)) {
            	return;
            }
            
            lastWidth = width;
            lastHeight = height;
            
            var cellIndex = 0;
            var existingCells = cells.length;
            
            for(var y = 0; y < height;)
            {
            	var cellHeight;
            	var verticalPosition;
            	if(y == 0) {
            		verticalPosition = "top";
            		cellHeight = Math.min(imageHeight - gridBottom, height - gridBottom);
            	}
            	else if(y + imageHeight - gridTop >= height) {
            		verticalPosition = "bottom";
            		cellHeight = height - y;
            	}
            	else {
            		verticalPosition = "center";
            		cellHeight = Math.min(imageHeight - gridTop - gridBottom, height - y - gridBottom);
            	}
            	
            	for(var x = 0; x < width; cellIndex++)
            	{
            		var $cell;
            		if(cellIndex < existingCells) {
            			$cell = cells[cellIndex];
            		}
            		else {
            			cellElement = document.createElement('div');
            			$background.append(cellElement);
            			$cell = $(cellElement);
            			$cell.css({
            				'position':'absolute',
            				'background-image':backgroundImage
            			});
            			cells.push($cell);
            		}
            		
            		var cellWidth;
            		var horizontalPosition;
            		if(x == 0) {
            			horizontalPosition = "left";
            			cellWidth = Math.min(imageWidth - gridRight, width - gridRight);
            		}
            		else if(x + imageWidth - gridBottom >= width) {
            			horizontalPosition = "right";
            			cellWidth = width - x;
            		}
            		else {
            			horizontalPosition = "center";
            			cellWidth = Math.min(imageWidth - gridLeft - gridRight, width - x - gridRight);
            		}
            		
            		$cell.css({
            			'left':x + 'px',
            			'top':y + 'px',
            			'width':cellWidth + 'px',
            			'height':cellHeight + 'px',
            			'background-position':verticalPosition + ' ' + horizontalPosition
            		});
            		
            		x += cellWidth;
            	}
            	y += cellHeight;
            }
            for( var i = cellIndex; i < existingCells; i++) {
            	cells[i].remove();
            }
            cells.splice(cellIndex, cells.length - cellIndex);
		};
		
		var image = new Image();
		$(image).load(function() {
			if(image.width < gridLeft + gridRight || image.height < gridTop + gridBottom) {
				return; //invalid inputs
			}
			imageWidth = image.width;
			imageHeight = image.height;
			layoutGrid();
			// TODO: should resize when the text size is changed also
			// TODO: this event should be removed if the element is removed from the DOM
			$(window).resize(layoutGrid);
		}).attr('src', backgroundUrl);
		
	});
	
};
	
})(jQuery);