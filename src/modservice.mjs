import { argv } from 'process';
import { readFile, writeFile} from 'fs/promises';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

if (argv.length <= 2) {
  help()
  process.exit(1);
} else {
  const command = argv[2];
  const argument = argv[3];
  if (command) {
    if (argument) {
      eval(`${command}('${argument}')`);
    } else {
      eval(`${command}()`);
    }
  } else {
    console.log('Command not recognized.');
  }
}

function help() {
  console.log('-- ModService 1.0 --');
  console.log('*modservice install_rh -- Installs Rammerhead Dependencies');
  console.log('*modservice resetboot -- Reinstalls the Old Boot Manager');
  console.log('*modservice install_nodeunblocker -- Installs NodeUnblocker');
  console.log('*modservice version -- Gets the version');
  console.log('*modservice get_rh_sessions -- Gets all The Rammerhead Sessions');
  console.log('*modservice remove_rh_session [session] -- Gets all The Rammerhead Sessions');
}

async function resetboot() {
  try {
    const data = await readFile('./src/archive/bootstrap.c', 'utf8');
    console.log(`✅ Reset Boot has been requested!\n----------------------------\n${data}`);
    await writeFile('./src/index.mjs', data);
    console.log('Data written to index.mjs successfully!');
    const config = {
      isRammerheadEnabled: false,
      isNodeUnblockerEnabled: false
    };
    const jsonConfig = JSON.stringify(config, null, 2);
    fs.writeFileSync('./public/config.json', jsonConfig, 'utf8');
  } catch (error) {
    console.error('Error reading or writing file:', error);
  }
}

function install_rh() {
  try {
    const rammerheadPath = require.resolve('rammerhead');
    OverrideRHBootSector()
    console.log('--> Overriding')
} catch (error) {
    exec('npm install https://github.com/holy-unblocker/rammerhead/releases/download/v1.2.41-holy.5/rammerhead-1.2.41-holy.5.tgz')
    console.log('--> Rammerhead not Detected! Auto installing')
    OverrideRHBootSector()
}
}

async function OverrideRHBootSector() {
  try {
    const data = await readFile('./src/archive/rammerhead.py', 'utf8');
    console.log(`✅ Installing Rammerhead!\n----------------------------\n`);
    await writeFile('./src/index.mjs', data);
    console.log('Data written to index.mjs successfully!');
    const config = {
      isRammerheadEnabled: true,
      isNodeUnblockerEnabled: false
    };
    const jsonConfig = JSON.stringify(config, null, 2);
    fs.writeFileSync('./public/config.json', jsonConfig, 'utf8');
  } catch (error) {
    console.error('Error reading or writing file:', error);
  }
}

async function OverrideNUBootSector() {
  try {
    const data = await readFile('./src/archive/nodeunblocker.asm', 'utf8');
    console.log(`✅ Installing NodeUnblocker!\n----------------------------\n`);
    await writeFile('./src/index.mjs', data);
    console.log('Data written to index.mjs successfully!');
    const config = {
      isRammerheadEnabled: false,
      isNodeUnblockerEnabled: true
    };
    const jsonConfig = JSON.stringify(config, null, 2);
    fs.writeFileSync('./public/config.json', jsonConfig, 'utf8');
  } catch (error) {
    console.error('Error reading or writing file:', error);
  }
}

async function version() {
  try {
    const packageJson = await readFile('./package.json', 'utf-8');
    const { version } = JSON.parse(packageJson);
    console.log('Version:', version);
  } catch (error) {
    console.error('Error reading package.json:', error);
  }
}


function get_rh_sessions() {
  const sessionsDir = './node_modules/rammerhead/sessions';
    fs.readdir(sessionsDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        const fileNames = files.filter(file => fs.statSync(path.join(sessionsDir, file)).isFile());
        console.log('IDs Detected:');
        fileNames.forEach(fileName => console.log(fileName));
    });
}

function remove_rh_session(Session) {
  const sessionsDir = './node_modules/rammerhead/sessions';
    const sessionFilePath = path.join(sessionsDir, Session);

    fs.unlink(sessionFilePath, (err) => {
        if (err) {
            console.error('Error deleting session:', err);
            return;
        }
        console.log(`Session "${Session}" deleted successfully.`);
    });
}

function install_nodeunblocker() {
  try {
    const nodeunblocker = require.resolve('unblocker');
    OverrideNUBootSector()
    console.log('--> Overriding')
} catch (error) {
    exec('npm install unblocker')
    console.log('--> NodeUnblocker not Detected! Auto installing')
    OverrideNUBootSector()
}
}