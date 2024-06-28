import 'server-only';
import appServerApi from "@/api/appServerApi";
import { WebAppServerApiImpl } from "@/api/web/webAppServerApi.impl";
import eventEmitter from "@/imjc/emitter";
import imjcManager from "@/imjc/imjc";
import WebEventEmitter from "@/imjc/web/emitter.proto";
import WebIMJCManagerImpl from "@/imjc/web/imjc.proto";
import { cookies } from 'next/headers';
import { UserInfo } from '@/types/global';

export function getUserInfo(): UserInfo {
  const userId = parseInt(cookies().get('userId')?.value || '-1');
  const token = cookies().get('authenticatedToken')?.value || '';
  return {
    userId,
    authenticatedToken: token,
  }
}

export function initServer() {
  const { userId, authenticatedToken: token } = getUserInfo();
  appServerApi.init(new WebAppServerApiImpl(userId, token));
  eventEmitter.init(new WebEventEmitter());
  const webImjcManager = new WebIMJCManagerImpl(
    appServerApi,
    eventEmitter,
  );
  imjcManager.init(webImjcManager);
}