var image_type = "image/png";
var download_canvas_id = "#icon-canvas";

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
    $('#icon-target').get(0).className = 'fa-5x ' +
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
  var options = { icons: icons };
  // binds the iconpicker
  $('.iconpicker').iconpicker(options);
  });
}
