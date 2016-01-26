var miniQuery;
(function (exports) {
  exports.select = function(element) {
    switch(element[0]) {
      case "#":
      return document.getElementById(element.slice(1,element.length));
      break;
      case ".":
      return document.getElementsByClassName(element.slice(1,element.length));
      break;
      default:
      return document.getElementsByTagName(element);
    };
  }

  exports.hide = function(element) {
    elements = this.select(element);
    if (elements.length) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
      }
    } else {
      return elements.style.display = 'none';
    }
  };

  exports.show = function(element) {
    elements = this.select(element);
    if (elements.length) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = '';
      }
    } else {
      return elements.style.display = '';
    }
  };

  exports.addClass = function(element, classToAdd) {
    elements = this.select(element);
    if (elements.length) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add(classToAdd);
      }
    } else {
      return elements.classList.add(classToAdd);
    }
  };

  exports.addClass = function(element, classToRemove) {
    elements = this.select(element);
    if (elements.length) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove(classToRemove);
      }
    } else {
      return elements.classList.remove(classToRemove);
    }
  };

  exports.on = function(element, action, funct) {
    elements = this.select(element);
    if (elements.length) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(action, funct);
      }
    } else {
      return elements.addEventListener(action, funct);
    }
  };

  exports.trigger = function(element, action) {
    elements = this.select(element);
    if (elements.length) {
      for (var i = 0; i < elements.length; i++) {
        elements[i].dispatchEvent(new Event(action));
      }
    } else {
      return elements.dispatchEvent(new Event(action));
    }
  };

  exports.ajax = function(request) {
    var promise = new Promise(function(resolve, reject) {
      var oRequest = new XMLHttpRequest();
      oRequest.open(request.type, request.url)
      if (request.data) {
        oRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oRequest.send("person=" + request.data);
      } else {
        oRequest.send();
      }

      oRequest.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response);
        }
        else {
          reject(this.statusText);
        }
      }

      oRequest.onerror = function() {
        reject(this.statusText);
      }
    });
    return promise;
  };

  exports.ready = function(funct) {
    document.onreadystatechange = function() {
     if (document.readyState == "complete") {
       funct();
     }
   }
 };
})(miniQuery = {});

var $ = miniQuery;
