loadShaders([
  'shaders/gaussian.x.fs.glsl',
  'shaders/gaussian.y.fs.glsl',
  'shaders/sobel.fs.glsl',
  'shaders/copy.fs.glsl',
  'shaders/merge.fs.glsl'
], function (shaders) {
  var srcCanvas = document.createElement('canvas');
  srcCanvas.width = 1024;
  srcCanvas.height = 1024;
  var srcCtx = srcCanvas.getContext('2d');
  var dstCanvas = document.getElementById('main-canvas');
  var postproc = new PostProcessor(dstCanvas, 1024, 1024);

  var gx = postproc.createProgram(shaders[0]);
  var gy = postproc.createProgram(shaders[1]);
  var sobel = postproc.createProgram(shaders[2]);
  var copy = postproc.createProgram(shaders[3]);
  var merger = postproc.createProgram(shaders[4]);

  var origin = postproc.createInput(new Uint32Array(1024 * 1024), 1024, 1024);

  var WIDTH = 800;
  var HEIGHT = 600;
  var video = document.createElement('video');

  function tick() {
    srcCtx.drawImage(video, 0, 0);
    postproc.setupInputImage(srcCanvas);
    postproc.iterate(gx);
    postproc.iterate(gy);
    postproc.copyTo(origin);
    postproc.iterate(sobel);
    postproc.callProgram(merger, [postproc.working_textures[1], origin], postproc.working_textures[0], {});
    postproc.renderTexture(postproc.working_textures[0]);

    webkitRequestAnimationFrame(tick);
  }

  navigator.webkitGetUserMedia({video: true}, function (stream) {
    console.log('load');
    video.src = window.URL.createObjectURL(stream);
    video.play();
    setTimeout(function () {
      WIDTH = video.videoWidth;
      HEIGHT = video.videoHeight;
      dstCanvas.width = WIDTH;
      dstCanvas.height = HEIGHT;
      srcCtx.translate(WIDTH, HEIGHT);
      srcCtx.scale(-1, -1);

      webkitRequestAnimationFrame(tick);
    }, 100);
  });
});

