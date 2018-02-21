function render(members) {
  const html = members.map(function(properties) { 
    if(properties.email) {
      return Utilities.formatString(
        '<a href="mailto:%s" target="_blank">%s</a> (<a href="%s" target="_blank">slide</a>)<a href="%s" target="_blank"><img src="%s" width="100%"></a>', 
        properties.email, properties.fullname, properties.slideUrl, properties.profileUrl, properties.profileUrl) 
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