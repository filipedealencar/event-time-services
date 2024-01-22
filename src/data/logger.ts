import moment from "moment";

class Logger {
  private state: any; // TODO: Defina o tipo real do estado

  constructor() {
    // TODO: implementar o estado do logger para cada módulo
    this.state = null;
  }

  private async logMessage(type: string, ...args: any[]): Promise<void> {
    const chalk = (await import("chalk")).default || (await import("chalk"));
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    const logged = `${timestamp} ${args.join(" ")} `;

    switch (type) {
      case "log": {
        console.log(chalk.bgBlue(type.toUpperCase()), logged);
        break;
      }
      case "warn": {
        console.log(chalk.black.bgYellow(type.toUpperCase()), logged);
        break;
      }
      case "error": {
        console.log(chalk.bgRed(type.toUpperCase()), logged);
        break;
      }
      case "debug": {
        console.log(chalk.green(type.toUpperCase()), logged);
        break;
      }
      case "cmd": {
        console.log(chalk.black.bgWhite(type.toUpperCase()), logged);
        break;
      }
      case "ready": {
        console.log(chalk.black.bgGreen(type.toUpperCase()), logged);
        break;
      }
      default:
        throw new TypeError(
          "Logger type must be either warn, debug, log, ready, cmd, or error."
        );
    }
  }

  log(...args: any[]): void {
    this.logMessage("log", ...args);
  }

  error(...args: any[]): void {
    this.logMessage("error", ...args);
  }

  warn(...args: any[]): void {
    this.logMessage("warn", ...args);
  }

  debug(...args: any[]): void {
    this.logMessage("debug", ...args);
  }

  cmd(...args: any[]): void {
    this.logMessage("cmd", ...args);
  }

  ready(...args: any[]): void {
    this.logMessage("ready", ...args);
  }
}

export default new Logger();
