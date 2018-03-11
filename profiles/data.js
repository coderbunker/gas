function export(doc) {
  const id = doc.getId();
  const name = doc.getName();
  const data = convertSlidesFromPresentation(doc);
  const payload = {
    id:id, 
    name: name, 
    data: data,
    apptype: 'Slides',
    category: 'Freelancers'
  };
  return payload;
}