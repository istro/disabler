/* Add "enable" and "disable" methods to jQuery. Chainable, and can take callbacks.
 * What it actually does:
 * 1. adds/removes a class "disabled"
 * 2. sets/unsets attribute "disabled" on an element.
 * 3. deals with fake buttons (spans, divs) by wrapping them & inserting a "masking"
 *    div that catches and blocks click events.
 */
(function($){
  $.fn.extend({
    disable: function(callback) {
      return this.each(function() {
        // remove focus if it was focused
        $(this).blur();
        // set attribute disabled - for inputs, checkboxes etc.
        this.disabled = true;
        // add a class disabled - in case it's styled in a special way
        $(this).addClass('disabled');
        // Dealing with non-actionable elements (in case it's a fake button
        // (e.g. div or span styled with css magic and interactive by javascript sorcery)
        // 1. wrap in a div with all the same positioning rules (in case there are any
        // significant positioning rules),
        // 2. wrap in another div for two reasons:
        //  - to expand to dimensions of content (display:inline-block)
        //  - to create context for blocking mask (position:relative)
        // 3. add a mask to prevent click events from triggering (with a ridiculously high z-index)

        if (!$(this).parent().hasClass('disabling_wrapper')) {
          // preserve any existing style rules
          $(this).data('old_style', $(this).attr('style'));
          // capture relevant positioning rules
          var outer_css = 'display:' + $(this).css('display') + ';' +
                          'float:' + $(this).css('float') + ';' +
                          'position:' + $(this).css('position') + ';' +
                          'top:' + $(this).css('top') + ';' +
                          'right:' + $(this).css('right') + ';' +
                          'bottom:' + $(this).css('bottom') + ';' +
                          'margin:' + $(this).css('margin') + ';' +
                          'left:' + $(this).css('left') + ';';
          var wrapper_css = 'position:relative;' +
                            'display:inline-block;' +
                            'top:0;' +
                            'left:0';
          var mask_css = 'cursor:not-allowed;' +
                         'position:absolute;' +
                         'left:0;' +
                         'top:0;' +
                         'width:100%;' +
                         'height:100%;' +
                         'z-index:1000000';
          // reset styling so it stays put inside the wrappers
          $(this).attr('style', wrapper_css);
          // wrap it up
          $(this).wrap("<div style='" + outer_css + "'></div>").wrap("<div class='disabling_wrapper' style='" + wrapper_css + "'></div>");
          // insert mask div
          $("<div class='disabling_mask'>").attr('style', mask_css).insertAfter(this);
        }
        // call the callback if it's a function
        if ($.isFunction(callback)) {
          callback(this);
        }
      });
    },
    enable: function(callback) {
      return this.each(function() {
        this.disabled = false;
        $(this).removeClass('disabled');
        if ($(this).next().hasClass('disabling_mask')) {
          $(this).next().remove();
        }
        if ($(this).parent().hasClass('disabling_wrapper')) {
          $(this).unwrap().unwrap();
        }
        if (typeof($(this).data('old_style')) != 'undefined') {
          $(this).attr('style', $(this).data('old_style'));
        } else {
          $(this).attr('style', '');
        }
        if ($.isFunction(callback)) {
          callback(this);
        }
      });
    }
  });
}(jQuery));
