const chalk = require('chalk');
const yargs = require('yargs');
const definitions = require('./dictionary.js');

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new word',
    builder: {
        word: {
            describe: 'Word',
            demandOption: true,
            type: 'string'
        },
        definition: {
            describe: 'Definition',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        definitions.addDefinition(argv.word,argv.definition)
    }
});

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a word',
    builder: {
        word: {
            describe: 'Word',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        definitions.removeDefinition(argv.word)
    } 
});

//create list command
yargs.command({
    command: 'list',
    describe: 'List the definitions',
    handler() {
        definitions.listDefinitions();
        // console.log(chalk.yellow('Listing the note'))
    }
});

//create read command
yargs.command({
    command: 'read',
    describe: 'Read the definition',
    builder: {
        word:{
            describe: 'Read definition',
            demandOption: true,
            type: 'string'
        }   
    },
    handler(argv) {
        definitions.readDefinition(argv.word);
        // console.log(chalk.green('Reading the note'))
    }
});

console.log(yargs.argv);


// const msg = getdefinition()
// console.log(msg)
// console.log(validator.isEmail('booboo33@kjljkj.com'))
// const greenMsg = chalk.green.inverse.bold('Success!')
// console.log(greenMsg)
// console.log(process.argv)
// console.log('Hello')

