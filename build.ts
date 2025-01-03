import figlet from 'figlet';
import { spawnSync } from 'child_process';
import chalk from 'chalk';
import { configDotenv } from 'dotenv';

configDotenv({
    path: './.env.development',
});

console.log(figlet.textSync('Intract Builder'));

// Build Base
console.log(chalk.blue('Building Intract Base'));
try {
    spawnSync('yarn workspace @intractinc/base build', { stdio: 'inherit', shell: true });
} catch (error) {
    console.error(chalk.red('Error building base'), error);
}

// Build App
console.log(chalk.blue('Building Intract Frontend'));
try {
    spawnSync('yarn build', { stdio: 'inherit', shell: true });
} catch (error) {
    console.error(chalk.red('Error building base'), error);
}
