import timeouts from 'const/timeouts';
import store from 'store';

const IdleTracker = {
    actionTime: Date.now(),
    init: function() {
        setInterval(this.checkIdle.bind(this), timeouts.IdleCheck);
    },
    checkIdle: function() {
        const idleMinutes = (Date.now() - this.actionTime) / 1000 / 60;
        const maxIdleMinutes = store.getState().settings.idleMinutes;
        if (maxIdleMinutes && idleMinutes > maxIdleMinutes) {
            // Backbone.trigger('user-idle');
        }
    },
    regUserAction: function() {
        this.actionTime = Date.now();
    },
};

// Backbone.on('power-monitor-resume', IdleTracker.checkIdle, IdleTracker);

export default IdleTracker;
