import { WebAppServerApiImpl } from "@/api/web/webAppServerApi.impl";

let webAppServerApiImplInstance: WebAppServerApiImpl | null = null;
let currentUserId: number | null = null;
let currentToken: string | null = null;

export function getWebAppServerApiImpl(userId: number, token: string): WebAppServerApiImpl {
  if (!webAppServerApiImplInstance || currentUserId !== userId || currentToken !== token) {
    webAppServerApiImplInstance = new WebAppServerApiImpl(userId, token);
    currentUserId = userId;
    currentToken = token;
  }
  return webAppServerApiImplInstance;
}