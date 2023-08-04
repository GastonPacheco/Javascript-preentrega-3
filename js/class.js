class Mates {
    constructor(id, tipo, modelo, precio, imagen) {
        this.id = id,
        this.tipo = tipo,
        this.modelo = modelo,
        this.precio = precio,
        this.imagen = imagen
    }
    mostrarData() {
        console.log(`El modelo es ${this.modelo}, el tipo es ${this.tipo} y su precio es ${this.precio}`)
    }
}

const Mates1 = new Mates (1, "Mate", "Cactus", 1900, "mates1.jpg")
const Mates2 = new Mates (2, "Mate", "Buda", 2100, "mates2.jpg")
const Mates3 = new Mates (3, "Mate", "Stormtrooper", 2800, "mates3.jpg")
const Mates4 = new Mates (4, "Mate", "Pokebola", 2000, "mates4.jpg")
const Mates5 = new Mates (5, "Mate", "Harry Potter", 1800, "mates5.jpg")
const Mates6 = new Mates (6, "Mate", "Stich", 2500, "mates6.jpg")

let materia = []

if (localStorage.getItem("materia")) {
    materia = JSON.parse(localStorage.getItem("materia"))
}else{
    materia.push(Mates1, Mates2, Mates3, Mates4, Mates5, Mates6)
    localStorage.setItem("materia", JSON.stringify(materia))
}