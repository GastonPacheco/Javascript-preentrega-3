let objetosacomprar = []

if (localStorage.getItem("carrito")) {
    objetosacomprar = JSON.parse(localStorage.getItem("carrito"))
} else {
    localStorage.setItem("carrito", JSON.stringify(objetosacomprar))
}

function buscarproducto(explorado, array) {
    let buscando = array.filter(
        (mate) => mate.tipo.toLowerCase().includes(explorado.toLowerCase()) ||
            mate.modelo.toLowerCase().includes(explorado.toLowerCase())
    )

    if (buscando.length == 0) {
        coincidencia.innerHTML = ""
        let crearDiv = document.createElement("div")
        crearDiv.innerHTML = `<p> No se encontraron coincidencias</p>`
        coincidencia.appendChild(crearDiv)
        muestraproductos(array)
    } else {
        coincidencia.innerHTML = ""
        muestraproductos(buscando)
    }
}

function ordenMayorMenor(array) {
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => (b.precio - a.precio))
    muestraproductos(mayorMenor)
}

function ordenarMenorMayor(array) {
    let menorMayor = [].concat(array)
    menorMayor.sort((a, b) => (a.precio - b.precio))
    muestraproductos(menorMayor)
}

function ordenarAlfabeticamente(array) {
    let alfabeticamente = [].concat(array)
    alfabeticamente.sort((a, b) => {
     
        return 0;
    })
    muestraproductos(alfabeticamente)
}

let divMates = document.getElementById("productos")
let btnGuardarmate = document.getElementById("guardarmateBtn")
let buscador = document.getElementById("buscador")
let btnVerProducto = document.getElementById("verProducto")
let btnOcultarProducto = document.getElementById("ocultarProducto")
let modalCuerpo = document.getElementById("modal-cuerpo")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")

function muestraproductos(array) {
    divMates.innerHTML = ""

    for (const mate of array) {
        let nuevomate = document.createElement("div")
        nuevomate.classList.add("col-12", "col-md-6", "col-lg-4", "my-4")
        nuevomate.innerHTML = `<div id="${mate.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${mate.imagen}" alt="${mate.modelo} de ${mate.tipo}">
        <div class="card-body">
            <h4 class="card-title">${mate.modelo}</h4>
            <p>Autor: ${mate.tipo}</p>
            <p class="">Precio: ${mate.precio}</p>
        <button id="agregarBtn${mate.id}" class="btn btn-outline-success">Agregar al carrito</button>
        </div>
</div>`
        divMates.appendChild(nuevomate)
        let btnSumar = document.getElementById(`agregarBtn${mate.id}`)

        btnSumar.addEventListener("click", () => {
            agregarAlCarrito(mate)
        })
    }
}

function agregarAlCarrito(mate) {
    objetosacomprar.push(mate)
    localStorage.setItem("carrito", JSON.stringify(objetosacomprar))
}

function cargarProductosCarrito(array) {
    modalCuerpo.innerHTML = ""

    array.forEach(productoCarrito => {
        modalCuerpo.innerHTML += `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
      <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.modelo}">
      <div class="card-body">
              <h4 class="card-title">${productoCarrito.modelo}</h4>
          
              <p class="card-text">$${productoCarrito.precio}</p> 
              <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
      </div>    
  </div>
`
    });

    array.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            objetosacomprar.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(objetosacomprar))


        })

    });

}

function cargarmate(array) {
    let inputTipo = document.getElementById("tipoInput")
    let inputModelo = document.getElementById("modeloInput")
    let inputPrecio = document.getElementById("precioInput")

    let mateCreado = new mate(array.length + 1, inputTipo.value, inputModelo.value, parseInt(inputPrecio.value), "matesss.jpg")
    array.push(mateCreado)
    localStorage.setItem("materia", JSON.stringify(array))
    muestraproductos(array)
    inputTipo.value = ""
    inputModelo.value = ""
    inputPrecio.value = ""
}

btnGuardarmate.addEventListener("click", () => {
    cargarmate(materia)
})

buscador.addEventListener("input", () => {
    buscarproducto(buscador.value, materia)
})

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(objetosacomprar)
})

selectOrden.addEventListener("change", () => {
    if (selectOrden.value == 1) {
        ordenMayorMenor(materia)
    }

    else if (selectOrden.value == 2) {
        ordenarMenorMayor(materia)
    }

    else if (selectOrden.value == 3) {
        ordenarAlfabeticamente(materia)
    }
    else {
        muestraproductos(materia)
    }
})

muestraproductos(materia)
