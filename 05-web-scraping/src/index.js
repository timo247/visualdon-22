import jsdom from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"


const items = {
    list:[]
}
/*Cours_
// Lancement browser
const browser = await puppeteer.launch();
//Ouvrir une nouvelle page
  const page = await browser.newPage();
  console.log(page)
//Aller au lien example.com
await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');
 
//Sélecteurs
const tableCantons = await page.$('table.wikitable'); // document.querySelector
//await page.$$(sélecteur); // document.querySelectorAll
// EXEMPLE : await page.$$(div);
 
//Appliquer une fonction aux sélecteurs
//await page.$$eval(sélecteur, pageFunction[...args]);
// EXEMPLE : const divCount = await page.$$eval('div', (divs) => divs.length);
 
//Cliquer sur un selecteur
/*
await page.click(sélecteur);


//Faire un screenshot
await tableCantons.screenshot({ path: '././img/photoDesCantons.png' });
 
// Fermer les browser
await browser.close();
};
*/

//capture d'écran des cantons
async function screenShotCantons() {
    // Lancement browser
    const browser = await puppeteer.launch();
    //Ouvrir une nouvelle page
    const page = await browser.newPage();
    //console.log(page)
    await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');

    //Sélecteurs
    const tableCantons = await page.$('table.wikitable'); // document.querySelector
    await tableCantons.screenshot({ path: '././img/photoDesCantons.png' });
    // Fermer les browser
    await browser.close();
};



//Affichage de la liste des cantons dans la console
async function showCantonsOnConsole() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');

    const result = await page.$$eval('table.wikitable tr', rows => {
        return Array.from(rows, row => {
            const columns = row.querySelectorAll('td');
            return Array.from(columns, column => column.innerText);
        });
    });
    console.log(result)

    const cantonsTable = []

    result.forEach(canton => {
        let newCanton = [];
        newCanton["canton"] = canton[0];
        newCanton["population"] = canton[3];
        cantonsTable.push(newCanton);
    });

    console.table(cantonsTable)
}


//Webscrap E-commerce
async function scrapECommerce() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops');


    //     const result = await page.$$eval('div.thumbnail', rows => {
    //         return Array.from(rows, row => {
    //           const columns = row.querySelectorAll('td');
    //           return Array.from(columns, column => column.innerText);
    //         });
    //       });
    //     console.log(result)


    const result = await page.$$('div.thumbnail');
    result.forEach(async item => {
        let priceScrap = await item.$('h4.price')
        let price = await priceScrap.evaluate(el => el.innerText)

        let nameScrap = await item.$('a.title')
        let name = await nameScrap.evaluate(el => el.innerText)

        let ratingScrap = await item.$('[data-rating]')
        let rating = await ratingScrap.evaluate(el => el.dataset.rating)

        let newItem = {
            name: name,
            price: price,
            rating: rating
        }

        console.log(newItem)
        //console.log(items)
        items.list.push(newItem)
    })
    console.log(items.list)    
    //.then(items => console.log(items))
}

// screenShotCantons();
//showCantonsOnConsole();
scrapECommerce()
