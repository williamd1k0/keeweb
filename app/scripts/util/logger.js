/* eslint-disable no-console */

const Level = {
    Off: 0,
    Error: 1,
    Warn: 2,
    Info: 3,
    Debug: 4,
    All: 5,
};

const MaxLogsToSave = 100;

const lastLogs = [];

class Logger {
    static Level = Level;

    constructor(name, id) {
        this.prefix = name ? name + (id ? ':' + id : '') : 'default';
        this.level = Level.All;
    }

    ts(ts) {
        if (ts) {
            return Math.round(performance.now() - ts) + 'ms';
        } else {
            return performance.now();
        }
    }

    getPrefix() {
        return new Date().toISOString() + ' [' + this.prefix + '] ';
    }

    debug(...args) {
        args[0] = this.getPrefix() + args[0];
        if (this.level >= Level.Debug) {
            Logger.saveLast('debug', args);
            console.log(...args);
        }
    }

    info(...args) {
        args[0] = this.getPrefix() + args[0];
        if (this.level >= Level.Info) {
            Logger.saveLast('info', args);
            console.info(...args);
        }
    }

    warn(...args) {
        args[0] = this.getPrefix() + args[0];
        if (this.level >= Level.Warn) {
            Logger.saveLast('warn', args);
            console.warn(...args);
        }
    }

    error(...args) {
        args[0] = this.getPrefix() + args[0];
        if (this.level >= Level.Error) {
            Logger.saveLast('error', args);
            console.error(...args);
        }
    }

    setLevel(level) {
        this.level = level;
    }

    getLevel() {
        return this.level;
    }

    static saveLast(level, args) {
        lastLogs.push({ level, args: Array.prototype.slice.call(args) });
        if (lastLogs.length > MaxLogsToSave) {
            lastLogs.shift();
        }
    }

    static getLast() {
        return lastLogs;
    }
}

export { Logger };
