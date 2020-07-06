
function doscale() {
  var el = document.getElementsByClassName("reveal")[0];
  var elHeight = el.outerHeight;
  var elWidth = el.outerWidth;
  var scale;

  var targetWidth = 1920;
  var targetHeight = 1080;

  scale = Math.min(
    document.body.clientWidth / targetWidth,
    document.body.clientHeight / targetHeight
  );

  el.css = {
    transform: "scale(" + 3.0 + ")"
  };
  el.style.transformOrigin = "0% 0%";
  el.style.transform = "scale(" + scale + ")";
}

doscale();

window.addEventListener('resize', doscale);
document.addEventListener('fullscreenchange', doscale);
document.addEventListener('webkitfullscreenchange', doscale);
document.addEventListener('mozfullscreenchange', doscale);
