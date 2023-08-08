let matesEnCarrito = []

if (localStorage.getItem("carrito")) {
    matesEnCarrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    localStorage.setItem("carrito", JSON.stringify(matesEnCarrito))
}

function buscarMate(buscado, array) {
    let busqueda = array.filter(
        (mate) => mate.tipo.toLowerCase().includes(buscado.toLowerCase()) ||
            mate.modelo.toLowerCase().includes(buscado.toLowerCase())
    )

    if (busqueda.length == 0) {
        coincidencia.innerHTML = ""
        let crearDiv = document.createElement("div")
        crearDiv.innerHTML = `<p> No se encontro el mate</p>`
        coincidencia.appendChild(crearDiv)
        mostrarListado(array)
    } else {
        coincidencia.innerHTML = ""
        mostrarListado(busqueda)
    }
}

function mayorMenor(array) {
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => (b.precio - a.precio))
    mostrarListado(mayorMenor)
}

function menorMayor(array) {
    let menorMayor = [].concat(array)
    menorMayor.sort((a, b) => (a.precio - b.precio))
    mostrarListado(menorMayor)
}

function ordenarAlfabeticamente(array) {
    let alfabeticamente = [].concat(array)
    alfabeticamente.sort((a, b) => {
     
        return 0;
    })
    mostrarListado(alfabeticamente)
}

let divProductos = document.getElementById("productos")
let btnGuardarMate = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let modalBody = document.getElementById("modal-body")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")

function mostrarListado(array) {
    divProductos.innerHTML = ""
    for (const mate of array) {
        let nuevoLibro = document.createElement("div")
        nuevoLibro.classList.add("col-12", "col-md-6", "col-lg-4", "my-4")
        nuevoLibro.innerHTML = 
        `<div id="${mate.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="img/${mate.imagen}" alt="${mate.modelo} de ${mate.tipo}">
            <div class="card-body">
                <h4 class="card-title">${mate.modelo}</h4>
                <p>Tipo: ${mate.tipo}</p>
                <p class="">Precio: ${mate.precio}</p>
                <button id="agregarBtn${mate.id}" class="btn btn-outline-success">Comprar</button>
            </div>
        </div>`
        divProductos.appendChild(nuevoLibro)
        let btnAgregar = document.getElementById(`agregarBtn${mate.id}`)
        btnAgregar.addEventListener("click", () => {
            agregarCarrito(mate)
        })
    }
}

function agregarCarrito(mate) {
    matesEnCarrito.push(mate)
    localStorage.setItem("carrito", JSON.stringify(matesEnCarrito))
}

function cargarProductosCarrito(array) {
    modalBody.innerHTML = ""
    array.forEach(productoCarrito => {
        modalBody.innerHTML += 
        `<div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="img/${productoCarrito.imagen}" alt="${productoCarrito.modelo}">
            <div class="card-body">
                <h4 class="card-title">${productoCarrito.modelo}</h4>
                <p class="card-text">$${productoCarrito.precio}</p> 
                <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>`
    });
    array.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            matesEnCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(matesEnCarrito))
        })
    });
}

function cargarLibro(array) {
    let inputTipo = document.getElementById("autorInput")
    let inputNombre = document.getElementById("tituloInput")
    let inputPrecio = document.getElementById("precioInput")
    let mateCreado = new Mates(array.length + 1, inputTipo.value, inputNombre.value, parseInt(inputPrecio.value), "matesss.jpg")
    array.push(mateCreado)
    localStorage.setItem("almacen", JSON.stringify(array))
    mostrarListado(array)
    inputTipo.value = ""
    inputNombre.value = ""
    inputPrecio.value = ""
}

btnGuardarMate.addEventListener("click", () => {
    cargarLibro(almacen)
})
buscador.addEventListener("input", () => {
    buscarMate(buscador.value, almacen)
})
botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(matesEnCarrito)
})

selectOrden.addEventListener("change", () => {
    if (selectOrden.value == 1) {
        mayorMenor(almacen)
    }

    else if (selectOrden.value == 2) {
        menorMayor(almacen)
    }

    else if (selectOrden.value == 3) {
        ordenarAlfabeticamente(almacen)
    }
    else {
        mostrarListado(almacen)
    }
})

mostrarListado(almacen)
