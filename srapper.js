const puppeteer  = require('puppeteer')

//const url = "https://fr.wikipedia.org/wiki/Sommaire";//"https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal";
//const type = "png";

module.exports = async (url,type,format) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2",timeout: 90000 });
    
    await page.setViewport({
        width: 1500,
        height: 10000
    })

    if(type == "pdf"){
        await page.pdf({
            path: url.split('.')[1] + ".pdf",
            format: "A2"
        })
    }else{
        await page.screenshot({
            path: url.split('.')[1] + "." + format
        })
    }

    /*let data = await page.evaluate(() =>{
        let list = []
        document.querySelectorAll('.mw-heading h2').forEach(a =>list.push(a.id))
        return list
    })

    for(i in data){console.log(data[i])}*/

    await browser.close()
}

