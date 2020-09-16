/**
 * Created by Administrator on 2018/7/20.
 */
function Emitter() {
  this._listener = {};//_listener[自定义的事件名] = [所用执行的匿名函数1, 所用执行的匿名函数2]
}

//注册事件
Emitter.prototype.bind = function (eventName, callback) {
  let listener = this._listener[eventName] || [];//this._listener[eventName]没有值则将listener定义为[](数组)。
  listener.push(callback);
  this._listener[eventName] = listener;
}

//触发事件
Emitter.prototype.trigger = function (eventName) {
  let args = Array.prototype.slice.apply(arguments).slice(1);//atgs为获得除了eventName后面的参数(注册事件的参数)
  let listener = this._listener[eventName];

  if (!Array.isArray(listener)) return;//自定义事件名不存在
  listener.forEach(function (callback) {
    try {
      callback.apply(this, args);
    } catch (e) {
      console.error(e);
    }
  })
}

var _instance;

export default _instance ? _instance : _instance = new Emitter();
