import { LauncherElectron } from 'launcher/launcher-electron';
import { LauncherCordova } from 'launcher/launcher-cordova';

const Launcher = LauncherElectron || LauncherCordova || undefined;

export { Launcher };
