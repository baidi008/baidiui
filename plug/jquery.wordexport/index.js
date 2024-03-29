import { saveAs } from 'file-saver'
if (typeof jQuery !== 'undefined' && typeof saveAs !== 'undefined') {
  ;(function($) {
    $.fn.wordExport = function(fileName, css) {
      fileName = typeof fileName !== 'undefined' ? fileName : 'jQuery-Word-Export'
      var staticA = {
        mhtml: {
          top:
            'Mime-Version: 1.0\nContent-Base: ' +
            location.href +
            '\nContent-Type: Multipart/related; boundary="NEXT.ITEM-BOUNDARY";type="text/html"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset="utf-8"\nContent-Location: ' +
            location.href +
            '\n\n<!DOCTYPE html>\n<html>\n_html_</html>',
          head: '<head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n<style>\n_styles_\n</style>\n</head>\n',
          body: '<body>_body_</body>'
        }
      }
      // Clone selected element before manipulating it
      var markup = $(this).clone()

      // Remove hidden elements from the output
      markup.each(function() {
        var self = $(this)
        if (self.is(':hidden')) self.remove()
      })

      // Embed all images using Data URLs
      var images = Array()
      var img = markup.find('img')

      for (var i = 0; i < img.length; i++) {
        // Calculate dimensions of output image
        var clientWidth = $(img[i]).width()
        var h = img[i].height * (clientWidth / img[i].width)
        // Create canvas for converting image to data URL
        var canvas = document.createElement('CANVAS')
        canvas.width = clientWidth
        canvas.height = h
        // Draw image to canvas
        var context = canvas.getContext('2d')
        context.drawImage(img[i], 0, 0, clientWidth, h)
        // Get data URL encoding of image
        var uri = canvas.toDataURL('image/png')

        $(img[i]).attr('src', img[i].src.replace('https://', 'http://'))
        img[i].width = clientWidth
        img[i].height = h
        // Save encoded image to array
        images[i] = {
          type: uri.substring(uri.indexOf(':') + 1, uri.indexOf(';')),
          encoding: uri.substring(uri.indexOf(';') + 1, uri.indexOf(',')),
          location: $(img[i]).attr('src'),
          data: uri.substring(uri.indexOf(',') + 1)
        }
      }

      // Prepare bottom of mhtml file with image data
      var mhtmlBottom = '\n'
      for (var i = 0; i < images.length; i++) {
        mhtmlBottom += '--NEXT.ITEM-BOUNDARY\n'
        mhtmlBottom += 'Content-Location: ' + images[i].location + '\n'
        mhtmlBottom += 'Content-Type: ' + images[i].type + '\n'
        mhtmlBottom += 'Content-Transfer-Encoding: ' + images[i].encoding + '\n\n'
        mhtmlBottom += images[i].data + '\n\n'
      }
      mhtmlBottom += '--NEXT.ITEM-BOUNDARY--'

      //TODO: load css from included stylesheet
      var styles =
        `
      table {
        font-color: #ffffff;
        font-size: 12;
        width: 100%;
        padding: 6px;       
      }
      table,table td {
        border-collapse:collapse;
        border:1px solid #000;
        font: 微软雅黑;
      }
      ` + css
      // Aggregate parts of the file together
      var fileContent = staticA.mhtml.top.replace('_html_', staticA.mhtml.head.replace('_styles_', styles) + staticA.mhtml.body.replace('_body_', markup.html())) + mhtmlBottom

      // Create a Blob with the file contents
      var blob = new Blob([fileContent], {
        type: 'application/msword;charset=utf-8'
      })
      saveAs(blob, fileName + '.doc')
    }
  })(jQuery)
} else {
  if (typeof jQuery === 'undefined') {
    console.error('jQuery Word Export: missing dependency (jQuery)')
  }
  if (typeof saveAs === 'undefined') {
    console.error('jQuery Word Export: missing dependency (FileSaver.js)')
  }
}
