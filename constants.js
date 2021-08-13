d3.json('Practica/practica_airbnb.json')
    .then((featureCollection) => {
      window.barrioSele="Ventas"
        createBars(featureCollection);
        legend(featureCollection);
        drawMap(featureCollection);
    });

let winsize;
let pathMadrid;
const calcWinsize = () => winsize = { width: window.innerWidth, height: window.innerHeight };
calcWinsize();
const width = winsize.width;
const height = winsize.height;
const numberOfCategories = 6;
const colorArray = ["#FFC6FF", "#BDB2FF", "#A0C4FF", "#9BF6FF", "#CAFFBF", "#FDFFB6"]
const colourPalette = colorArray.slice(0, numberOfCategories);


