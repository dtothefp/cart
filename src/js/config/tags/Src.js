export default class Src {
  constructor() {
    this.tags = ['src'];
    this.i = 0;
    this.sites = {
      fill: 'http://www.fillmurray.com',
      cage: 'https://www.placecage.com'

    };
  }

  parse(parser, nodes, lexer) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);

    if (args.children.length === 0) {
      args.addChild(new nodes.Literal(0, 0, ''));
    }

    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, 'run', args);
  }

  run(context, args) {
    const sites = this.sites;
    const i = this.i;
    const type = args.type || Object.keys(sites)[i % 2];

    this.i++;
    return `${sites[type]}/30${i}/30${i}`;
  }
}
