import jsdom from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"

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
async function screenShotCantons () {
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


    async function showCantonsOnConsole(){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');
        const tableCantons = await page.$('table.wikitable'); // document.querySelector



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

   // screenShotCantons();
   //showCantonsOnConsole();