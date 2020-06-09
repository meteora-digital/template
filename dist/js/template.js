function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var loopObject = require('@meteora-digital/helpers/js/loopObject');

var Template = /*#__PURE__*/function () {
  function Template(object) {
    _classCallCheck(this, Template);

    this.data = object;
    this.html = [];

    if (Object.prototype.toString.call(this.data) == '[object Array]') {
      if (this.data.length >= 2) {
        for (var i = 0; i < this.data.length; i++) {
          this.html.push(this.createTemplate(this.data[i]));
        }
      } else {
        this.html = this.createTemplate(this.data[0]);
      }
    } else if (_typeof(this.data) === 'object') {
      this.html = this.createTemplate(this.data);
    }
  }

  _createClass(Template, [{
    key: "createTemplate",
    value: function createTemplate(data) {
      var _this = this;

      var element = document.createElement(data.tagName);
      delete data.tagName;
      element.className = '';
      loopObject(data, function (key, value) {
        // Children
        if (key === 'innerHTML' && _typeof(value) === 'object') {
          for (var i = 0; i < value.length; i++) {
            element.appendChild(_this.createTemplate(value[i]));
          }
        } // Classes
        else if (key === 'classList' || key === 'className') {
            element.className += value;
          } // Styles
          else if (key === 'style' && _typeof(value) === 'object') {
              loopObject(value, function (styleName, styleValue) {
                element.style[styleName] = styleValue;
              });
            } // Data Attributes
            else if (key === 'dataset') {
                if (_typeof(value) === 'object') {
                  loopObject(value, function (dataName, dataValue) {
                    element.setAttribute("data-".concat(dataName), dataValue);
                  });
                }
              } else {
                element[key] = value;
              }
      });
      return element;
    }
  }, {
    key: "renderInside",
    value: function renderInside(el) {
      if (el) {
        for (var i = 0; i < this.html.length; i++) {
          el.appendChild(this.html[i]);
        }
      }
    }
  }]);

  return Template;
}();
/* new Template(
	[
		{
			tagName: 'article',
			classList: 'classes here'
			innerHTML: [
				{
					tagName: 'p',
					classList: 'classes here',
					innnerHTML: 'Text here'
				},
				{
					tagName: 'input',
					type: 'checkbox',
					value: 1,
				}
			]
		}
	]
)*/


export { Template as default };