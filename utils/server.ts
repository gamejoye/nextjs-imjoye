import 'server-only';
import appServerApi from "@/api/appServerApi";
import { WebAppServerApiImpl } from "@/api/web/webAppServerApi.impl";
import eventEmitter from "@/imjc/emitter";
import imjcManager from "@/imjc/imjc";
import WebEventEmitter from "@/imjc/web/emitter.proto";
import WebIMJCManagerImpl from "@/imjc/web/imjc.proto";
import { cookies } from 'next/headers';

export function initServer() {
  const userId = parseInt(cookies().get('userId')?.value || '-1');
  const token = cookies().get('authenticatedToken')?.value || '';
  appServerApi.init(new WebAppServerApiImpl(userId, token));
  eventEmitter.init(new WebEventEmitter());
  const webImjcManager = new WebIMJCManagerImpl(
    appServerApi,
    eventEmitter,
  );
  imjcManager.init(webImjcManager);
}