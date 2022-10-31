export const errorMessage = (e: Error) => {
  const message = e.message || JSON.stringify(e, null, 2);
  return String(message);
};

type LoggingMethod = 'log' | 'warn' | 'error';
type LoggerFn = (message: string) => void;

export class Logger {
  log: LoggerFn;
  error: LoggerFn;
  warn: LoggerFn;

  private handlerName: string;
  private logger =
    (method: LoggingMethod, handler: string) => (message: string) => {
      console[method](`[${method.toUpperCase()}] ${handler}: ${message}`);
    };

  constructor(handlerName: string) {
    this.handlerName = handlerName;
    this.log = this.logger('log', handlerName);
    this.error = this.logger('error', handlerName);
    this.warn = this.logger('warn', handlerName);
  }
}
