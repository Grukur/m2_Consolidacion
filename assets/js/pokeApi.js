
/* index.html */
/* muestra y cierra Hisotria */
$('#history').click(function () {
    $('#historyP').css('display', 'block')
})
$('#historyClose').click(function () {
    $('#historyP').css('display', 'none')
})
/* muestra y cierra Extra */
$('#extra').click(function () {
    $('#extraP').css('display', 'block')
})
$('#extraClose').click(function () {
    $('#extraP').css('display', 'none')
})


/* digiApi.html */
/* Limpia buscador */
$('#pokemonList').mouseenter(function () {
    $('#nombre').val('')
})
$('#nombre').mouseenter(function () {
    $('#pokemonList').val('')
})

/* Array donde guardaremos nuestra lista de Digimons con F:popularLista */
var digiArray = []

/* show divs by changing height */
const showDivs = ()=>{
    $('#mostrar_pokemon').attr('height', 'auto');
    $('#chartContainer').attr('height', '600px');
    $('#chartContainer2').attr('height', '400px');
}

/* Funcion para la estructura de nuestra card y definimos la data a entregar */
const loadDigimon = (info) => {
    document.querySelector("#mostrar_pokemon").innerHTML = `
     <div class="card bg-warning-subtle">
         <img src="${info.img}" class="card-img-top">
         <div class="card-body">
             <h5 class="card-title text-center fs-4 text-capitalize">${info.name}</h5>
             <hr>
             <p class="card-text fs-5 text-capitalize"><strong>Level: </strong> ${info.level}</p>
         </div>
     </div>`
}

 /* Funcion para nuestra lista y galeria */
 const popularLista = (lista) => {                
    for (i in lista) {
        $('#pokemonList').append(`<option>${lista[i].name}</option>`)
        $('#carrusel').append(`<div class="carousel-item text-center">
            <img src="${lista[i].img}" class="d-block w-100" alt="...">
            <h4 class="text-capitalize text-black">${lista[i].name}</h4>
        </div>`)
        digiArray.push(lista[i].name)
    }
}

/* funcion selector de input para comnezar busqueda */
const selectorDigi = (digiArray)=>{
    if ($('#nombre').val() != '') {
        if (digiArray.includes(($('#nombre').val()).charAt(0).toUpperCase() + ($('#nombre').val()).slice(1))) {
            digimon = ($('#nombre').val()).charAt(0).toUpperCase() + ($('#nombre').val()).slice(1);
        } else {
            alert('Por favor ingrese un nombre valido o desde la lista.');
        }
    } else {
        digimon = $('#pokemonList').val()
    } return digimon
}

/* Funcion para obtener el array buscado */
const obtenerTarget = (lista, digimon)=>{
    for (i in lista) {
        let nameDigi = lista[i].name
        if (digimon === nameDigi)
            var targetDigi = lista[i]
    } return targetDigi
}

/* creamos funcion para consumo de API */
function fetchDigimons() {
    let url = `https://digimon-api.vercel.app/api/digimon/`
    fetch(url)
        .then(info => info.json())
        .then(lista => {

            /* populamos nuestra lista */            
            popularLista(lista)

            /* creamos un evento preventDefault */
            $('#form_pokemon').submit(function (event) {
                event.preventDefault()
                let digimon = selectorDigi(digiArray)               

                /* showDivs() */

                /* llamamos la estructura y entregamos data desde F:obtenerTarget */
                loadDigimon(obtenerTarget(lista, digimon))

                /* inventamos stats */
                let hp = Math.floor(Math.random() * 200) + 50
                let stamina = Math.floor(Math.random() * 100) + 20
                let speed = Math.floor(Math.random() * 100) + 10
                let attack = Math.floor(Math.random() * 300) + 80
                let magic = Math.floor(Math.random() * 300) + 80

                /* chart 1 */
                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "dark2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `Stats de ${obtenerTarget(lista, digimon).name}`
                    },
                    data: [{
                        type: "column",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "false",
                        legendText: "{label}",
                        indexLabelFontSize: 20,
                        indexLabel: "{y}",
                        dataPoints: [
                            { y: hp, label: "HP" },
                            { y: stamina, label: "Stamina" },
                            { y: speed, label: "Speed" },
                            { y: attack, label: "Attack" },
                            { y: magic, label: "Magic" }
                        ]
                    }]
                });
                chart.render();

                /* chart 2 */
                var chart2 = new CanvasJS.Chart("chartContainer2", {
                    theme: "dark2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: `Stats de ${obtenerTarget(lista, digimon).name}`
                    },
                    data: [{
                        type: "column",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "false",
                        legendText: "{label}",
                        indexLabelFontSize: 20,
                        indexLabel: "{y}",
                        dataPoints: [
                            { y: hp, label: "HP" },
                            { y: stamina, label: "Stamina" },
                            { y: speed, label: "Speed" },
                            { y: attack, label: "Attack" },
                            { y: magic, label: "Magic" }
                        ]
                    }]
                });
                chart2.render();
            })
        })
        .catch((error) => {
            console.error(error)
        })
}
fetchDigimons()







