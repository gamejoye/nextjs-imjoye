import appServerApi from "@/api/appServerApi";
import { WebAppServerApiImpl } from "@/api/web/webAppServerApi.impl";

export function initServer() {
  appServerApi.init(new WebAppServerApiImpl());
}