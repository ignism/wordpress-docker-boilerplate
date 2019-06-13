export const documentOffset = function(element) {
  let rect = element.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  }
}

export const getLineHeight = function(element){
  let temp = document.createElement(element.nodeName);
  temp.setAttribute("style","margin:0px;padding:0px;font-family:"+element.style.fontFamily+";font-size:"+element.style.fontSize);
  temp.innerHTML = "lorem";
  temp = element.parentNode.appendChild(temp);
  
  let lineHeight = temp.clientHeight;
  temp.parentNode.removeChild(temp);
  return lineHeight;
}