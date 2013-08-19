var WIDTH = 800;
var HEIGHT = 600;
var video = document.createElement('video');

function init() {
  var srcCanvas = document.createElement('canvas');
  srcCanvas.width = 1024;
  srcCanvas.height = 1024;
  var srcCtx = srcCanvas.getContext('2d');
  srcCtx.translate(WIDTH, HEIGHT);
  srcCtx.scale(-1, -1);

  var dstCanvas = document.getElementById('main-canvas');
  dstCanvas.width = WIDTH;
  dstCanvas.height = HEIGHT;

  var postproc = new PostProcessor(dstCanvas, 1024, 1024);
  var gx = postproc.createProgram(loadShader('shaders/gaussian.x.fs.glsl'));
  var gy = postproc.createProgram(loadShader('shaders/gaussian.y.fs.glsl'));
  var sobel = postproc.createProgram(loadShader('shaders/sobel.fs.glsl'));
  var copy = postproc.createProgram(loadShader('shaders/copy.fs.glsl'));
  var origin = postproc.createInput(null, 1024, 1024);

  function tick() {
    srcCtx.drawImage(video, 0, 0);
    postproc.setupInputImage(srcCanvas);
    postproc.copyTo(origin);
    postproc.iterate(sobel);
    postproc.render();

    webkitRequestAnimationFrame(tick);
  }

  webkitRequestAnimationFrame(tick);
}


navigator.webkitGetUserMedia({video: true}, function (stream) {
  video.src = window.URL.createObjectURL(stream);
  video.play();
  setTimeout(function () {
    WIDTH = video.videoWidth;
    HEIGHT = video.videoHeight;
    init();
  }, 100);
});