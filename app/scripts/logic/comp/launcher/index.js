import LauncherElectron from './launcher-electron';
import LauncherCordova from './launcher-cordova';

export default LauncherElectron || LauncherCordova || undefined;
