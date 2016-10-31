import jsonServer from 'json-server';
import {readJson, outputJson} from 'fs-extra';
import {cbToProm as promisify} from 'boiler-utils';

export default function(gulp, plugins, config) {
  const {utils} = config;
  const {addbase} = utils;
  const dbPath = addbase('data', 'db.json');
  const read = promisify(readJson);
  const write = promisify(outputJson);
  const server = jsonServer.create();
  const router = jsonServer.router(dbPath);
  const middlewares = jsonServer.defaults();

  return () => {
    return read(dbPath)
      .then(json => {
        json.cart_order.length = 0;

        return write(dbPath, json);
      })
      .then(() => {
        const listen = promisify(server.listen, {ctx: server});
        server.use(middlewares);
        server.use(router);

        return listen(3000);
      });
  };
}
