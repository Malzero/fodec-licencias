export function getFromStorage(key) {
  if(!key){
    return null;
  }
  try {
    const valuesStr = localStorage.getItem(key);
    if(valueStr) {
      return JSON.parse(valuesStr);

    }
    return null;
  } catch (err) {
    return null;

  }
}
export function setInStorage(key, obj) {

  if(!key){
    console.error('Error: key está perdida');
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.error(err);
  }

}
