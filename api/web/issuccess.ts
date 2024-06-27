export function isCreated(statusCode: number | string): boolean {
  statusCode = statusCode + '';
  return statusCode === '201';
}

export function isOk(statusCode: number | string): boolean {
  statusCode = statusCode + '';
  return statusCode === '200';
}