import LauncherElectron from 'launcher/launcher-electron';
import LauncherCordova from 'launcher/launcher-cordova';

export default LauncherElectron || LauncherCordova || undefined;
