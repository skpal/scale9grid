## Introduction ##

This plugin adds support for scaling background images using a 9-grid. Developers can specify a grid for selected elements which causes the background-image to be scaled selectively, depending on what part of the grid the background lies.

![http://hempton.com/examples/scale9grid/grid.png](http://hempton.com/examples/scale9grid/grid.png)

Parts of the background which lie in the corners of the grid will not be scaled and parts in the sides of the grid will only be scaled in one direction. 9-Grid scaling can be applied to an element through one line of code:

```
$('#elementid').scale9Grid({top:10,bottom:10,left:10,right:10});
```

Where the top, bottom, left, and right values define the scaling grid.

## Examples ##

Check out the examples here http://hempton.com/examples/scale9grid.

## Reasons to Use 9-Grid Scaling ##

  * No more slicing up images into multiple files
  * No more tedious styling and structural markup for the same effect
  * Achieve rounded corners
  * Achieve drop shadows
  * Complex fluid backgrounds

Tested in the following browsers on windows (If you have a different browser/os let me know the results)
  * IE6
  * IE7
  * Firefox 3.04
  * Chrome 0.3.154.9
  * Opera 9.51

## Sites that use scale9Grid ##

  * http://onesquareinch.org
  * http://blog.meetcast.com