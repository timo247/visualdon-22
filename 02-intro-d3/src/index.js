import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

//cercles 
const WIDTH = 1000
   const HEIGHT = 1000


   let orangeCirc= d3.select('.cercles')
                .attr("style", "display: flex; flex-direction:column")
               .append("svg")
               .attr("width", 1000)
               .attr("height", 1000)
               .attr("class", "svgCircles") 
               .append("circle")
                  .attr("cx", "50px")
                  .attr("cy", "50px")
                  .attr("r", "40")
                  .attr("fill", "orange");

let greenCirc = d3.select('.svgCircles')   
.append("circle")  
.attr("cx", "150px")
.attr("cy", "150px")
.attr("r", "40")
.attr("fill", "green")



  let blueCirc = d3.select('.svgCircles')   
  .append("circle")  
  .attr("cx", "250px")
  .attr("cy", "250px")
  .attr("r", "40")
  .attr("fill", "blue")



//changer la couleur du deuxième cercle
let svgCircles = document.querySelector('.svgCircles');
let secondCirc = svgCircles.children[1];
secondCirc.setAttribute("fill", 'pink')
console.log(svgCircles)

    //déplacement du deuxième cercle vers la droite
    let firstCirc = svgCircles.children[0];
    firstCirc.setAttribute("cx", "100")
    secondCirc.setAttribute("cx", "200")



//Ajout de texte sous chaque cercle
console.log(firstCirc.cy.baseVal.value);
d3.select('.svgCircles')   
.append("text")  
.attr("x", firstCirc.cx.baseVal.value - 25)
.attr("y", firstCirc.cy.baseVal.value + 50)
.attr("fill", "green")
.text("text circle 1");



let thirdCirc = svgCircles.children[2];
d3.select('.svgCircles')   
.append("text")  
.attr("x", secondCirc.cx.baseVal.value - 25)
.attr("y", secondCirc.cy.baseVal.value + 50)
.attr("fill", "green")
.text("text circle 2");

d3.select('.svgCircles')   
.append("text")  
.attr("x", thirdCirc.cx.baseVal.value - 25)
.attr("y", thirdCirc.cy.baseVal.value + 50)
.attr("fill", "green")
.text("text circle  3");



//Alignement des cercles au clic

thirdCirc.addEventListener('click', e => {
  let initFirstCircXValue= 100;
  let initSecondCircXValue = 200;
  
  if(firstCirc.getAttribute("cx") == "100" ){
  firstCirc.setAttribute("cx", thirdCirc.cx.baseVal.value)
  secondCirc.setAttribute("cx", thirdCirc.cx.baseVal.value)
   } else {
  firstCirc.setAttribute("cx", initFirstCircXValue)
  secondCirc.setAttribute("cx", initSecondCircXValue)
  }
})


//Réucpération des données
// Ces données représentent la hauteur des rectangles que vous allez dessiner avec la méthode data(data).enter() que nous avons vue en cours. Les rectangles auront une largeur fixe de 20px et doivent être alignés en bas l'un à côté de l'autre (comme un graphique en batons ! 📊 )
let data = [20, 5, 25, 8, 15];
let rectWidth = 20;


const rectSvg = d3.select(".rectangles")
.append("svg")
.attr("width", 100)
.attr("height", 100)
.attr("class", "svg-rect")

//let rectSvg = document.querySelector('.svg-rect')
console.log(rectSvg)

  rectSvg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", rectWidth)
    .attr("height", d => d)
    .attr("fill", "green")
    .attr("y", d => 100 - d)
    .attr("x", (d,i) => i*25+30)