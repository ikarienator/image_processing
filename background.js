chrome.app.runtime.onLaunched.addListener(function () {
  chrome.app.window.create("index.html", {
    singleton: true,
    id: "index",
    width: 800,
    height: 700
  })
});