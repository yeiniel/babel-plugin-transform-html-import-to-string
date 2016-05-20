import fs from 'fs';
import p from 'path';
import rework from 'rework';
import reworkImport from 'rework-import';

function endsWith(str, search) {
    return str.indexOf(search, str.length - search.length) !== -1;
}

export default function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration: {
                exit: function(path, state) {
                    const node = path.node;

                    if (endsWith(node.source.value, '.html')) {
                        const dir = p.dirname(p.resolve(state.file.opts.filename));
                        const absolutePath = p.resolve(dir, node.source.value);

                        const css = rework(fs.readFileSync(absolutePath, "utf8"))
                            .use(reworkImport({path: p.dirname(absolutePath)}))
                            .toString({compress: true});

                        path.replaceWith(t.variableDeclaration("var", [
                            t.variableDeclarator(
                                t.identifier(node.specifiers[0].local.name),
                                t.stringLiteral(css))]));
                    }
                }
            }
        }
    };
}