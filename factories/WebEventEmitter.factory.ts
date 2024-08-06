import WebEventEmitter from "@/imjc/web/emitter.proto";

let webEventEmitterInstance: WebEventEmitter | null = null;

export function getWebEventEmitter(): WebEventEmitter {
  if (!webEventEmitterInstance) {
    webEventEmitterInstance = new WebEventEmitter();
  }
  return webEventEmitterInstance;
}