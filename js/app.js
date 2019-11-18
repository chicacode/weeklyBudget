// Variables
const presupuestoUsuario = prompt('¿Cuál es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;


// Classes
// Clase de presupuesto

class Budget{ // Presupuesto
    constructor(budget){
        this.budget = Number(budget); // Esto lo convierte a numero
        this.restante = Number(budget);
    }
    // Método que ira monitoreando el presupuesto e ira restando los gastos
    presupuestoRestante(cantidad = 0){ // en caso que no se presente una cantidad queda por default a cero
        return this.restante -= Number(cantidad);
    }
}
// Clase Interfaz, maneja todo lo relacionado con HTML

class Interfaz{
    insertarPresupuesto(cantidad){ // Comunicación entre clases y metodos
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        // Insertar dinamicamente mediante JS al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
    imprimirMensaje(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        // Insertar en ele DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        // Quitar el alert despues de 3 segundos
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
    // Inserta los gastos a la lista
    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');

        // Crear un LI
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center'; // esto es clase de bootstrap
        // Insertar el gasto
        li.innerHTML= `
            ${nombre}
            <span class="badge badge-primary badge-pill"> € ${cantidad}</span>
        `;

        // Insertar al HTML tomando como referencia al padre
        gastosListado.appendChild(li);
    }
    // comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        //Leemos el presupuesto restante
        const presupuestoRestanteUsuario = 
        cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }
    // cambia de color el presupuesto restante
    comprobarPresupuesto(){
        console.log(cantidadPresupuesto); // Esta variable es la que instancia un presupuesto

        const presupuestoTotal = cantidadPresupuesto.budget;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //Comprobar el 25% del gasto
        if( (presupuestoTotal / 4) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if( (presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }

    }
}

// AddEventListeners
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario=== ''){
        window.location.reload();
    }else{
        // Hay que pasarle el valor de la cantidad que viene del prompt
        // Instancia de la clase Budget
        cantidadPresupuesto = new Budget(presupuestoUsuario); 
        // Instanciar la clase de interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.budget);
    }

});

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    // Leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // Instanciar la Interfaz
    const ui = new Interfaz();

    // Comprobar que los gastos no estan vacios
    if(nombreGasto === '' || cantidadGasto === ''){
        // 2 parámetros: mensaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    }else{
        // Insertar listado en el HTML
        ui.imprimirMensaje('Correcto', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }

});