var image_type = "image/png";
var download_canvas_id = "#icon-canvas";
var icon_target_id = "#icon-target";

function capture() {
    html2canvas($(download_canvas_id), {
        onrendered: function(canvas) {
            window.open(canvas.toDataURL(image_type));
        }
    });
}

function capture_and_download() {
    html2canvas($(download_canvas_id), {
        onrendered: function(canvas) {
            var a = document.createElement('a');
            // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
            a.href = canvas.toDataURL(image_type).replace(image_type, "image/octet-stream");
            a.download = 'image.png';
            a.click();
        }
    });
}

/**
 * Binds the "iconpickerSelected" event in order to display
 * the selected icon in the target element.
 */
function bind_events() {
  // on icon input changed
  $('.iconpicker').on('iconpickerSelected', function(e) {
    $(icon_target_id).get(0).className = 'fa-5x ' +
    e.iconpickerInstance.options.iconBaseClass + ' ' +
    e.iconpickerInstance.options.fullClassFormatter(e.iconpickerValue);
  });
}

/**
 * Loads the iconpicker using the icons.yml version provided.
 */
function load_icon_picker(icon_yaml_url) {
  var icons = [];
  // updates the icon list
  $.get('https://rawgit.com/FortAwesome/Font-Awesome/v4.6.3/src/icons.yml', function(data){
    var parsed_yaml = jsyaml.load(data);
    $.each(parsed_yaml.icons, function(index, icon) {
        icons.push('fa-' + icon.id);
    })
    var options = {
      icons: icons,
      component: '.picker-component-selector'
    };
    // binds the iconpicker
    $('.iconpicker').iconpicker(options);
  });
}

function bind_color_picker()
{
  var options = {
    component: '.picker-component-selector'
  };
  var elem_class = '.colorpicker-component';

  var colorpicker = $(elem_class).colorpicker(options);
  colorpicker.on('changeColor', function(e) {
    $(icon_target_id)[0].style.color = e.color.toHex();
  });
}

/**
 * Binds slider and input with target font-size.
 * Also makes sure input and slider are binded together.
 */
function bind_size_slider()
{
  var options = {
    max: 512
  };
  var font_input_id = '#font-input';
  var slider_class = '.size-slider';
  var font_input_elem = $(font_input_id);
  var slider_elem = $(slider_class);
  // updates icon font-size on input update events
  // also makes sure the slider gets updated
  font_input_elem.on('input propertychange paste', function() {
    var value = parseInt(font_input_elem.val(), 10);
    $(icon_target_id)[0].style.fontSize = value + 'px';
    slider_elem.slider('setValue', value);
  });
  slider_elem.slider(options);
  // updates input element on slide event
  // also makes sure the input gets updated
  slider_elem.on("slide", function(slideEvt) {
    $(icon_target_id)[0].style.fontSize = slideEvt.value + 'px';
    font_input_elem.val(slideEvt.value);
  });
}
