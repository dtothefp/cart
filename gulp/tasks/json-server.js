// import jsonServer from 'json-server';
import {spawn} from 'child_process';

export default function(gulp, plugins, config) {
  // const {utils} = config;
  // const {addbase} = utils;
  // const server = jsonServer.create();
  // const router = jsonServer.router(
    // addbase('data', 'db.json')
  // );
  // const middlewares = jsonServer.defaults();

  return cb => {
    const cp = spawn('npm', ['start'], {stdio: 'inherit'});

    cp.on('close', cb);
    // server.use(middlewares)
    // server.use(router)
    // server.listen(3000, cb);
  };
}
