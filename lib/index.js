'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            ImportDeclaration: {
                exit: function exit(path, state) {
                    var node = path.node;

                    if (endsWith(node.source.value, '.html')) {
                        var dir = _path2.default.dirname(_path2.default.resolve(state.file.opts.filename));
                        var absolutePath = _path2.default.resolve(dir, node.source.value);

                        var css = (0, _rework2.default)(_fs2.default.readFileSync(absolutePath, "utf8")).use((0, _reworkImport2.default)({ path: _path2.default.dirname(absolutePath) })).toString({ compress: true });

                        path.replaceWith(t.variableDeclaration("var", [t.variableDeclarator(t.identifier(node.specifiers[0].local.name), t.stringLiteral(css))]));
                    }
                }
            }
        }
    };
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _rework = require('rework');

var _rework2 = _interopRequireDefault(_rework);

var _reworkImport = require('rework-import');

var _reworkImport2 = _interopRequireDefault(_reworkImport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function endsWith(str, search) {
    return str.indexOf(search, str.length - search.length) !== -1;
}