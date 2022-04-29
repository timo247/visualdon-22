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

//capture d'écran
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


    screenShotCantons();