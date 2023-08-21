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

const mate1 = new Mates (1, "Mate", "Cactus", 3500, "mates1.jpg")
const mate2 = new Mates (2, "Mate", "Buda", 4500, "mates2.jpg")
const mate3 = new Mates (3, "Mate", "Storm Trooper", 3700, "mates3.jpg")
const mate4 = new Mates (4, "Mate", "Pokebola", 2000, "mates4.jpg")
const mate5 = new Mates (5, "Mate", "Harry Potter", 5000, "mates5.jpg")
const mate6 = new Mates (6, "Mate", "Stitch", 4000, "mates6.jpg")

let almacen = []

if (localStorage.getItem("almacen")) {
    almacen = JSON.parse(localStorage.getItem("almacen"))
}else{
    almacen.push(mate1, mate2, mate3, mate4, mate5, mate6)
    localStorage.setItem("almacen", JSON.stringify(almacen))
}