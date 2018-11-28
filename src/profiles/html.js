
function render(members) {
  const gotoSlideScript = "<script>function gotoSlide(e, slideId) {event.preventDefault(); google.script.run.gotoSlide(slideId); return false;}</script>"
  const html = gotoSlideScript + members.map(function(properties) { 
    if(properties.email) {
      return Utilities.formatString(
        '<a href="mailto:%s" target="_blank">%s</a> (<a href="#" onclick="gotoSlide(this, \'%s\')">goto slide</a>)<a href="%s" target="_blank"><img src="%s" width="100%"></a>', 
        properties.email, properties.fullname, properties.objectId, properties.profileUrl, properties.profileUrl) 
    } else {
       return Utilities.formatString(
        '%s<a href="%s" target="_blank"><img src="%s" width="100%"></a>', 
        properties.fullname, properties.profileUrl, properties.profileUrl) 
    }

  }).join('');
  
  Logger.log(html);
  const template = HtmlService.createTemplate(html);
  const page = template.evaluate();
  return page;
}