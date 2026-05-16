const fs = require('fs');
const path = require('path');
const code = fs.readFileSync(path.join(__dirname, 'src/pages/Landing.jsx'), 'utf8');
const Stack = [];
for (let i = 0; i < code.length; i++) {
  const ch = code[i];
  if ('([{'.includes(ch)) Stack.push({ ch, pos: i + 1 });
  else if (')}]'.includes(ch)) {
    if (!Stack) {
      console.error('Unmatched closing', ch, 'at', i + 1);
      process.exit(1);
    }
    const o = Stack.pop();
    if ((o.ch === '(' && ch !== ')') || (o.ch === '{' && ch !== '}') || (o.ch === '[' && ch !== ']')) {
      console.error('Mismatched', o.ch, 'at', o.pos, 'with', ch, 'at', i + 1);
      process.exit(1);
    }
  }
}
if (Stack.length) {
  console.error('Unclosed', Stack[Stack.length - 1].ch, 'at', Stack[Stack.length - 1].pos);
  process.exit(1);
}
console.log('Balanced parens/braces/brackets');
