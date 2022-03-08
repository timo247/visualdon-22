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
.text("text circle2");



let thirdCirc = svgCircles.children[2];
d3.select('.svgCircles')   
.append("text")  
.attr("x", secondCirc.cx.baseVal.value - 25)
.attr("y", secondCirc.cy.baseVal.value + 50)
.attr("fill", "green")
.text("text circle2");

d3.select('.svgCircles')   
.append("text")  
.attr("x", thirdCirc.cx.baseVal.value - 25)
.attr("y", thirdCirc.cy.baseVal.value + 50)
.attr("fill", "green")
.text("text circle3");



//firstCirc.append(text1);
