import { domOn } from "./DomFunctions.js";

console.log("coucou")


//Changer le rectangle de couleur
domOn('.redRectangle', 'click', evt => {

    //Récupération du nombre de clicks posés sur le rectangle
    let rectangleDiv = document.querySelector('.redRectangle');
    let numberOfClicks = parseInt(rectangleDiv.dataset.clicknumbers);
    console.log(numberOfClicks)



    let fillColor = 'red'
    //On change en vert si nClick est impair et en rouge si n clicks est paire
    if (numberOfClicks % 2 == 0) {
        fillColor = 'green'
    } else {
        fillColor = 'red';
    }

    //On stock la nouvelle valeur de nClicks valeurs
    numberOfClicks++;
    rectangleDiv.dataset.clicknumbers = numberOfClicks;

    let rectangle = evt.target;
    rectangle.setAttribute("fill", fillColor);
    console.log(evt.target)

});



/*
let donut = document.querySelector('.externalCircle');
console.log(donut)
*/

//Agrandir le cercle extérieur
domOn('.externalCircle', 'mouseover', evt => {
    console.log(evt.target.r.baseVal.value)
    let r = evt.target.r.baseVal.value;
    r += 30;
    evt.target.r.baseVal.value = r;

    console.log("afterchange", evt.target.r.baseVal.value)
});



//récupérer le texte de l'ex 4

let name = document.querySelector('.name');
console.log(name);