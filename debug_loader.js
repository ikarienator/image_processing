(function (global) {
    var scripts = document.querySelectorAll('script');
    var script_base_url = scripts[scripts.length - 1].src;
    scripts = null;
    var include_re = /^#include\s*"([\w\.]+?)"\s*$/gm;
    var rel_re = /(\/[^\/]+\/\.\.)|([^\/]+\/\.\.\/?)/g;
    var loadingCache = {};

    function loadShader(file, base_url) {
        if (loadingCache[file]) {
            return loadingCache[file];
        }

        var nf = file.replace(rel_re, '');
        while (nf != file) {
            file = nf;
            nf = file.replace(rel_re, '');
        }
        if (file.substring(0, 7) == 'http://' ||
                file.substring(0, 8) == 'https://') {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", file, false);
            xhr.send(null);
            var code = xhr.responseText;
            code = code.replace(include_re, function (text, included_file) {
                return loadShader(included_file, file);
            });
            return loadingCache[file] = code;
        }
        if (!base_url) {
            base_url = script_base_url;
        }
        if (base_url.charAt(base_url.length - 1) == '/') {
            return loadShader(base_url + file);
        } else {
            return loadShader(base_url.substring(0, base_url.lastIndexOf('/') + 1) + file);
        }
    }
    global.loadShader = loadShader;
})(this);