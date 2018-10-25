(function() {
	createIframe(document, '', function(iframe){
		var parent = getKeys(window);
		var self = getKeys(iframe);
		var result = test(parent, self);
		console.log(result);
	});
	function test(source, target){
    var res = {};
    each(source, function(item, key){
      if(target[key] === undefined){
        res[key] = source[key];
      }
    });
		return res;
	}
	function getKeys(obj){
    var res = {};
    each(obj, function(item, key){
      res[key] = obj[key];
    });
		return res;
	}
  function each(obj, func){
    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        func(obj[key], key, obj);
      }
    }
  }
	function createIframe(parent, src, cb){
		parent = parent || document;
		var iframe = parent.createElement('iframe');
    iframe.onload = function() {
      cb(iframe.contentWindow);
			iframe.remove();
    };
    iframe.src = src || 'about:blank';
		iframe.style.cssText = 'display: none;';
    parent.body.appendChild(iframe);
  }
})();