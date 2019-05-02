
function renderMembers(members) {
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
  
  const template = HtmlService.createTemplate(html);
  const page = template.evaluate();
  return page;
}

function renderKeyValues(kv) {
  const deleteKey = '<script>function deleteKey(e, k) {event.preventDefault(); google.script.run.deleteKey(k); return false;}</script>';
  const deleteAllProperties = '<script>function deleteAllProperties(e) {event.preventDefault(); google.script.run.deleteAllProperties(); return false;}</script>';
  const getKeyValue = '<script>function getKeyValue(e, k) {event.preventDefault(); google.script.run.withSuccessHandler(function(v) { alert(v); }).getKeyValue(k); return false;}</script>';
  const deleteAllPropertiesButton = '<a href="#" onclick="deleteAllProperties(this)">Delete All Properties</a><ul>';

  const html = deleteKey + deleteAllProperties + deleteAllPropertiesButton + getKeyValue + Object.keys(kv).map(function(k) { 
      return Utilities.formatString(
        '<li><pre>%s</pre> [<a href="#" onclick="deleteKey(this, \'%s\')">Delete</a>] [<a href="#" onclick="getKeyValue(this, \'%s\')">Show</a>]</li>', 
        k, k, k) 
  }).join('') + '</ul>';
  
  const template = HtmlService.createTemplate(html);
  const page = template.evaluate();
  return page;
}
