var ProtoData = function () {};

ProtoData.createModel = function (data) {
  data.get = function (objInfo) {
    var obj;
    var lookupObj;
    var guid;

    // Could be false (used in arrays for empty entry...)
    if (!objInfo) {
      return false;
    }

    if (typeof objInfo === 'string') {
      guid = objInfo;
    } else if (
      Object.prototype.toString.call(objInfo) === '[object Array]'
    ) {
      return this.getArray(objInfo);
    } else if (objInfo && objInfo.guid) {
      guid = objInfo.guid;
    }

    lookupObj = this.lookup[guid];

    if (!lookupObj) {
      // Console.log( "COULDN'T FIND:" + guid );

      // Lets create an empty one!!!
      var guidArr = guid.split('_');
      var guidIndex = guidArr[guidArr.length - 1];
      guidArr.pop();
      var guidType = guidArr.join('_');

      // Just take the first one...
      var refObj = this.lookup[guidType + '_0'];
      if (!refObj) {
        // Console.log( "COULDN'T FIND it again:" + guid );
        return objInfo; // Just reflect it back...;
      }

      var newObj = {};

      this.lookup[guid] = newObj;

      for (var name in refObj) {
        if (Object.prototype.toString.call(refObj[name]) === '[object Array]') {
          newObj[name] = [];
        } else if (Object.prototype.toString.call(refObj[name]) === '[object Object]') {
          if (refObj[name].guid) {
            var objGuid = refObj[name].guid;
            var objGuidArr = objGuid.split('_');
            objGuidArr.pop();
            objGuid = objGuidArr.join('_');
            newObj[name] = this.get(objGuid + '_' + guidIndex);
          } else {
            var subObj = refObj[name];
            var newSubObj = {};
            for (var subName in subObj) {
              if (!this.diffListeners.hasOwnProperty(subName)) {
                continue;
              }
              newSubObj[subName] = '';
            }
            newObj[name] = newSubObj;
          }
        } else {
          newObj[name] = '';
        }
      }
      newObj.guid = guid;

      obj = newObj;
    } else {
      obj = lookupObj; // New lookupObj();
    }

    if (obj) {
      return obj;
    }
    return false;
  };

  data.getArray = function (objArray) {
    var arr = [];
    for (var i = 0; i < objArray.length; i++) {
      arr.push(this.get(objArray[i]));
    }
    return arr;
  };

  // Process root into actual references
  var _root = {};
  var idStr;
  var typeStr;
  for (var i = 0; i < data._root.length; i++) {
    idStr = data._root[i];
    typeStr = idStr.split('_')[0];
    _root[typeStr] = data.get(idStr);
  }
  data._root = _root;

  // You should be able to walk around with just the _root,
  // so get lookup is added to it...
  _root.get = function (objInfo) {
    return data.get(objInfo);
  };

  return data;
};
