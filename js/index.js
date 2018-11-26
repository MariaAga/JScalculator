var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}
var Calc = (function(_React$Component) {
  _inherits(Calc, _React$Component);
  function Calc(props) {
    _classCallCheck(this, Calc);
    var _this = _possibleConstructorReturn(
      this,
      (Calc.__proto__ || Object.getPrototypeOf(Calc)).call(this, props)
    );
    _this.currentNumberChangeHandle = function() {
      var number = _this.state.currentNumber;
      if (number[0] === '0' && number.length > 1) {
        _this.setState({ currentNumber: number.slice(1) });
      }
    };
    _this.calcActionHandle = function(action) {
      if (!['+', '-', '*', '/'].includes(action)) return;
      var display = _this.state.display;
      var currentNumber = _this.state.currentNumber;
      if (
        display.length > 1 &&
        (currentNumber === '0' || currentNumber === '')
      ) {
        display[display.length - 1] = action;
        _this.setState({
          display: display
        });
      } else {
        _this.setState({
          display: [].concat(_toConsumableArray(display), [
            currentNumber,
            action
          ]),
          currentNumber: ''
        });
      }
    };
    _this.calcHandle = function() {
      var formula = [].concat(_toConsumableArray(_this.state.display), [
        _this.state.currentNumber
      ]);
      if (!_this.isFormulaValid(formula)) return;
      var answer = eval(formula.join(' '));

      _this.setState({ display: [], currentNumber: '' + answer });
    };
    _this.isFormulaValid = function(formula) {
      var i = 0;
      while (i + 1 < formula.length) {
        if (!parseInt(formula[i])) {
          return false;
        }
        i++;
        if (!['+', '-', '*', '/'].includes(formula[i])) {
          return false;
        }
        i++;
      }
      return parseInt(formula[i]);
    };
    _this.calcDecimalHandle = function() {
      if (_this.state.currentNumber.includes('.')) return;
      _this.setState({
        currentNumber: _this.state.currentNumber + '.'
      });
    };
    _this.state = {
      currentNumber: '0',
      display: [],
      numbers: [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine'
      ]
    };
    return _this;
  }
  _createClass(Calc, [
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevState) {
        if (this.state.currentNumber !== prevState.currentNumber) {
          this.currentNumberChangeHandle();
        }
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;
        return React.createElement(
          'div',
          { class: 'calc' },
          React.createElement(
            'div',
            { id: 'display-total' },
            this.state.display.join(' '),
            ' ',
            this.state.currentNumber
          ),

          React.createElement(
            'div',
            { id: 'display' },
            ' ',
            this.state.currentNumber
          ),
          React.createElement(
            'div',
            { class: 'calc-keys' },
            React.createElement(
              'button',
              {
                id: 'add',
                onClick: function onClick() {
                  return _this2.calcActionHandle('+');
                }
              },
              '+'
            ),

            React.createElement(
              'button',
              {
                id: 'subtract',
                onClick: function onClick() {
                  return _this2.calcActionHandle('-');
                }
              },
              '-'
            ),

            React.createElement(
              'button',
              {
                id: 'multiply',
                onClick: function onClick() {
                  return _this2.calcActionHandle('*');
                }
              },
              'x'
            ),

            React.createElement(
              'button',
              {
                id: 'divide',
                onClick: function onClick() {
                  return _this2.calcActionHandle('/');
                }
              },
              '/'
            ),

            this.state.numbers.map(function(number, index) {
              return React.createElement(
                'button',
                {
                  id: '' + number,
                  onClick: function onClick() {
                    var display = _this2.state.display;
                    _this2.setState({
                      currentNumber: _this2.state.currentNumber + index
                    });
                  }
                },

                index
              );
            }),
            React.createElement(
              'button',
              {
                id: 'equals',
                onClick: function onClick() {
                  return _this2.calcHandle();
                }
              },
              '='
            ),

            React.createElement(
              'button',
              {
                id: 'decimal',
                onClick: function onClick() {
                  return _this2.calcDecimalHandle();
                }
              },
              '.'
            ),

            React.createElement(
              'button',
              {
                id: 'clear',
                onClick: function onClick() {
                  _this2.setState({ display: [], currentNumber: '0' });
                }
              },
              'AC'
            )
          )
        );
      }
    }
  ]);
  return Calc;
})(React.Component);

ReactDOM.render(
  React.createElement(Calc, null),
  document.getElementById('app')
);
