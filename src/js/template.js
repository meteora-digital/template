function loopObject(object, func) {
  if (object && typeof object === 'object') {
    for (let key in object) {
      func(key, object[key]);
    }
  }
}

export default class Template {
  constructor (object) {
    this.data = object;
    this.html = [];

    if (Object.prototype.toString.call(this.data) == '[object Array]') {
      if (this.data.length >= 2) {
        for (let i = 0; i < this.data.length; i++) {
          this.html.push(this.createTemplate(this.data[i]));
        }
      }else {
        this.html = this.createTemplate(this.data[0]);
      }
    }else if (typeof this.data === 'object') {
      this.html = this.createTemplate(this.data);
    }

  }

  createTemplate(data) {
    const element = document.createElement(data.tagName);
    delete data.tagName;

    element.className = '';

    loopObject(data, (key, value) => {
      // Children
      if (key === 'innerHTML' && typeof value === 'object') {
        for (let i = 0; i < value.length; i++) {
          element.appendChild(this.createTemplate(value[i]));
        }
      }
      // Classes
      else if (key === 'classList' || key === 'className') {
        element.className += value;
      }
      // Styles
      else if (key === 'style' && typeof value === 'object') {
        loopObject(value, (styleName, styleValue) => {
          element.style[styleName] = styleValue;
        });
      }
      // Data Attributes
      else if (key === 'dataset') {
        if (typeof value === 'object') {
          loopObject(value, (dataName, dataValue) => {
            element.setAttribute(`data-${dataName}`, dataValue);
          });
        }
      }else {
        element[key] = value;
      }
    });

    return element;
  }

  renderInside(el) {
    if (el) {
      if (Array.isArray(this.html)) {
        for (let i = 0; i < this.html.length; i++) el.appendChild(this.html[i]);
      }else {
        el.appendChild(this.html);
      }
    }
  }
}

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