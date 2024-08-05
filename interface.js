const qoa = require('qoa')
const { log } = console;
const scrapper = require('./srapper')

const url = [
    {
        type: 'input',
        query: 'URL de la page a visiter (Ex: "https://fr.wikipedia.org/wiki/Sommaire"): ',
        handle: 'url'
    }
];

const type = [{
    type: 'interactive',
    query: "Action a operer sur le contenu de la page: ",
    handle: "type",
    symbol: ">",
    menu: [
        'pdf',
        'Screenshot'
    ]
}];

const imgFormat = [{
    type: 'interactive',
    query: "Format de l'image: ",
    handle: "format",
    symbol: "->",
    menu: [
        'png',
        'jpeg',
        'jpg'
    ]

}];

(async () => {
    await qoa.prompt(url)
    .then(ur => {
        qoa.prompt(type)
        .then(typ => {
            if(typ.type !== "pdf"){
                qoa.prompt(imgFormat)
                .then(format => {
                    scrapper(ur.url,typ.type,format.format)
                })
            }else{
                scrapper(ur.url,typ.type,'')
            }

        })
    })
    
})()
