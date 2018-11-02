/**
 * 查看自定义的全局变量
 * @name (testGlobal)
 * @func
 * @copyright [查看来源]{@link https://davidwalsh.name/global-variables-javascript}
 */
(function() {
		var iframe = document.createElement('iframe');
    iframe.onload = function() {
      var result = {};
      Object.keys(window).forEach(function(key) {
        iframe.contentWindow[key] === undefined && (result[key] = window[key]);
      });
      console.log(result);
      iframe.remove();
    };
    iframe.src = 'about:blank';
    iframe.style.cssText = "display: none";
    document.body.appendChild(iframe);
})();