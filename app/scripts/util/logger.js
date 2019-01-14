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

    debug() {
        arguments[0] = this.getPrefix() + arguments[0];
        if (this.level >= Level.Debug) {
            Logger.saveLast('debug', arguments);
            console.log.apply(console, arguments); // eslint-disable-line no-console
        }
    }

    info() {
        arguments[0] = this.getPrefix() + arguments[0];
        if (this.level >= Level.Info) {
            Logger.saveLast('info', arguments);
            console.info.apply(console, arguments); // eslint-disable-line no-console
        }
    }

    warn() {
        arguments[0] = this.getPrefix() + arguments[0];
        if (this.level >= Level.Warn) {
            Logger.saveLast('warn', arguments);
            console.warn.apply(console, arguments); // eslint-disable-line no-console
        }
    }

    error() {
        arguments[0] = this.getPrefix() + arguments[0];
        if (this.level >= Level.Error) {
            Logger.saveLast('error', arguments);
            console.error.apply(console, arguments); // eslint-disable-line no-console
        }
    }

    setLevel(level) {
        this.level = level;
    }

    getLevel() {
        return this.level;
    }

    static saveLast(level, args) {
        lastLogs.push({ level: level, args: Array.prototype.slice.call(args) });
        if (lastLogs.length > MaxLogsToSave) {
            lastLogs.shift();
        }
    }

    static getLast() {
        return lastLogs;
    }
}

export default Logger;
