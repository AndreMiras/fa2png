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

function bind_events() {
  // on icon input changed
  $('.iconpicker').on('iconpickerSelected', function(e) {
    $('#icon-target').get(0).className = 'fa-5x ' +
    e.iconpickerInstance.options.iconBaseClass + ' ' +
    e.iconpickerInstance.options.fullClassFormatter(e.iconpickerValue);
  });
  // binds the iconpicker
  $('.iconpicker').iconpicker();
}
