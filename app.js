let autos = require('./modulos/autos.js');

const juan = {
    nombre: 'Juan',
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
}

const andrea = {
    nombre: 'Andrea',
    capacidadDePagoEnCuotas: 100,
    capacidadDePagoTotal: 10000000
}

const concesionaria = {
    autos: autos,
    buscarAuto: function (patenteIn) {
        let encontreAuto;
        let noEncontreAuto = null;

        for (let i = 0; i < this.autos.length; i++) {
            if (patenteIn == this.autos[i].patente) {
                encontreAuto = this.autos[i]
            }
        }

        return (encontreAuto != null) ? encontreAuto : noEncontreAuto;
    },
    venderAuto: function (patenteIn) {
        let encontroPatente = this.buscarAuto(patenteIn);

        if (encontroPatente != null) {
            let cambioEstado = encontroPatente.vendido = true;
            return encontroPatente;
        } else {
            return null
        }
    },
    autosParaLaVenta: function () {
        let autosSinVender = this.autos.filter(auto => auto.vendido == false);
        return autosSinVender;
    },
    autosNuevos: function () {
        const autosALaVenta = this.autosParaLaVenta()

        let autosNuevos = autosALaVenta.filter(autoConsultado => autoConsultado.vendido == false && autoConsultado.km < 100)
        return autosNuevos;
    },
    listaDeVentas: function () {
        let autosVendidos = this.autos.filter(auto => auto.vendido)
        return autosVendidos.map(auto => auto.precio)
    },
    totalDeVentas: function () {
        let ventasParciales = this.listaDeVentas();
        return ventasParciales.reduce((totalVentas, precioAuto) => totalVentas + precioAuto, 0)
    },
    puedeComprar: function (auto, persona) {
        return (persona.capacidadDePagoTotal >= auto.precio && persona.capacidadDePagoEnCuotas >= (auto.precio/auto.cuotas))
    },
    autosQuePuedeComprar: function(persona){
        let autosALaVenta = this.autosParaLaVenta();
        let resultadoEstudio = autosALaVenta.filter(auto => this.puedeComprar(auto, persona));
        return resultadoEstudio;
        
    }
}

console.log(concesionaria.autosQuePuedeComprar(andrea));