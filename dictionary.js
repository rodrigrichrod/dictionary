const fs = require('fs');
const chalk = require('chalk');

const getDefinitions = () => 'Your definitions...';

const removeDefinition = (word) => {
    const definition = loadDefinitions();
    const findDefinition = definition.filter(definition => definition.word !== word);
    if(findDefinition.length !== definition.length){
        saveDefinition(findDefinition);
        const msg = 'The definition for ' + word + ' was successfully removed.';
        console.log(chalk.green(msg));
    }
    else{
        const msgFail = 'Sorry, the definition ' + word + ' does not exist.';
        console.log(chalk.red(msgFail));
    }
};

const addDefinition = (word,definition) => {
    const definitions = loadDefinitions();
    const duplicatedefinition = definitions.find(definitions => definitions.word === word);

    if(!duplicatedefinition){
        definitions.push({
            word: word,
            definition: definition
        });
        saveDefinition(definitions);
        console.log(chalk.blue('New definition added!'));
    }
    else{
        console.log(chalk.red('Sorry, word already exists'));
    }
};

const listDefinitions = () => {
    const definition = loadDefinitions();
    if(definition.length === 0){
        console.log(chalk.red.inverse('Sorry, there are no definition to display'));
    }
    else{
        console.log(chalk.green('Your definition'));
        definition.forEach(definition => {
            console.log(chalk.green('word: ' + definition.word + ' \tdefinition: ' + definition.definition));
        });
    }
};

const saveDefinition = (definition) => {
    const dataJSON = JSON.stringify(definition);
    fs.writeFileSync('definition.json',dataJSON);
};

const loadDefinitions = () => {
    try{
        const dataBuffer = fs.readFileSync('definition.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e){
        return [];
    }    
};

const readDefinition = (word) => {
    const definition = loadDefinitions();
    const definitionFound = definition.find(definition => definition.word === word);
    
    if(definitionFound){
        console.log(chalk.green.inverse(definitionFound.word) + ' ' + definitionFound.definition);
    }
    else{
        console.log(chalk.red.inverse('Sorry, the definition ' + word + ' does not exist'));
    }
}

module.exports = {
    getDefinitions: getDefinitions,
    addDefinition: addDefinition,
    removeDefinition: removeDefinition,
    listDefinitions: listDefinitions,
    readDefinition: readDefinition
};