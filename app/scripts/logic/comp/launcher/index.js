import LauncherElectron from 'logic/comp/launcher/launcher-electron';
import LauncherCordova from 'logic/comp/launcher/launcher-cordova';

export default LauncherElectron || LauncherCordova || undefined;
