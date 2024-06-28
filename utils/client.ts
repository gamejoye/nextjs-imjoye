import 'client-only';
import appServerApi from "@/api/appServerApi";
import { WebAppServerApiImpl } from "@/api/web/webAppServerApi.impl";
import eventEmitter from "@/imjc/emitter";
import imjcManager from "@/imjc/imjc";
import WebEventEmitter from "@/imjc/web/emitter.proto";
import WebIMJCManagerImpl from "@/imjc/web/imjc.proto";

export function initClient() {
  appServerApi.init(new WebAppServerApiImpl(-1, ''));
  eventEmitter.init(new WebEventEmitter());
  const webImjcManager = new WebIMJCManagerImpl(
    appServerApi,
    eventEmitter,
  );
  imjcManager.init(webImjcManager);
}
