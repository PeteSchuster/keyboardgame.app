export default function (config, env, helpers) {
  if (env.production){
    config.output.publicPath = "/typing-game-825/";
  }
}
