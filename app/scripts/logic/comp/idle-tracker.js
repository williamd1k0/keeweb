import { Timeouts } from 'const/timeouts';
import { store } from 'store';

const IdleTracker = {
    actionTime: Date.now(),
    init() {
        setInterval(this.checkIdle.bind(this), Timeouts.IdleCheck);
    },
    checkIdle() {
        const idleMinutes = (Date.now() - this.actionTime) / 1000 / 60;
        const maxIdleMinutes = store.getState().settings.idleMinutes;
        if (maxIdleMinutes && idleMinutes > maxIdleMinutes) {
            // Backbone.trigger('user-idle'); // TODO
        }
    },
    regUserAction() {
        this.actionTime = Date.now();
    },
};

// Backbone.on('power-monitor-resume', IdleTracker.checkIdle, IdleTracker); // TODO

export { IdleTracker };
