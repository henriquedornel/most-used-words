const { ipcMain } = require('electron') //Electron IPC (Inter-Process Communication)

const pathsToRows = require('./pathsToRows')
const prepareData = require('./prepareData')
const groupWords = require('./groupWords')

ipcMain.on('process-subtitles', (event, paths) => {
    //console.log(paths)

    pathsToRows(paths)
        //.then(row => console.log(row))
        .then(rows => prepareData(rows))
        //.then(words => console.log(words))
        .then(words => groupWords(words))
        .then(groupedWords =>
            /*event.reply('process-subtitles', [
                { name: 'i', amount: 1234 },
                { name: 'you', amount: 900 },
                { name: 'he', amount: 853 },
                { name: 'she', amount: 853 },
                { name: 'our', amount: 133 },
                { name: 'house', amount: 23 },
            ])*/
            event.reply('process-subtitles', groupedWords)
        )
})