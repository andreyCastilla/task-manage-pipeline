/**
 * Valida el nombre de una tarea.
 *
 * Regla:
 * La tarea debe contener mínimo 3 caracteres.
 */
function validarTarea(nombre) {

    /** 
    if (typeof nombre !== "string") {
        return false;
    }

    return nombre.trim().length >= 3;
    **/
}


/**
 * Cuenta las tareas pendientes.
 */
function contarPendientes(tareas) {

    if (!Array.isArray(tareas)) {
        return 0;
    }

    return tareas.filter(
        tarea => tarea.completada === false
    ).length;
}


/**
 * Cuenta las tareas completadas.
 */
function contarCompletadas(tareas) {

    if (!Array.isArray(tareas)) {
        return 0;
    }

    return tareas.filter(
        tarea => tarea.completada === true
    ).length;
}


/*
|--------------------------------------------------------------------------
| Código utilizado solamente cuando estamos en el navegador
|--------------------------------------------------------------------------
*/

if (typeof document !== "undefined") {

    let tareas = [];

    const formulario =
        document.getElementById("formTarea");

    const inputTarea =
        document.getElementById("nombreTarea");

    const listaTareas =
        document.getElementById("listaTareas");

    const mensaje =
        document.getElementById("mensaje");


    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const nombre =
                inputTarea.value.trim();


            /*
             * VALIDACIÓN
             */

            if (!validarTarea(nombre)) {

                mostrarMensaje(
                    "La tarea debe tener mínimo 3 caracteres.",
                    "error"
                );

                return;
            }


            /*
             * CREAR TAREA
             */

            const nuevaTarea = {

                id: Date.now(),

                nombre: nombre,

                completada: false

            };


            tareas.push(nuevaTarea);


            inputTarea.value = "";


            mostrarMensaje(
                "Tarea agregada correctamente.",
                "correcto"
            );


            renderizarTareas();

        }
    );


    /**
     * Renderiza las tareas.
     */
    function renderizarTareas() {

        listaTareas.innerHTML = "";


        if (tareas.length === 0) {

            listaTareas.innerHTML = `
                <li class="lista-vacia">
                    No existen tareas registradas.
                </li>
            `;

            actualizarEstadisticas();

            return;
        }


        tareas.forEach(tarea => {

            const li =
                document.createElement("li");


            li.className =
                tarea.completada
                    ? "tarea completada"
                    : "tarea";


            li.innerHTML = `

                <span class="tarea-info">

                    ${tarea.nombre}

                </span>


                <div class="acciones">

                    <button
                        class="btn-completar"
                        data-id="${tarea.id}"
                    >

                        ${
                tarea.completada
                    ? "Reabrir"
                    : "Completar"
            }

                    </button>


                    <button
                        class="btn-eliminar"
                        data-id="${tarea.id}"
                    >

                        Eliminar

                    </button>

                </div>

            `;


            listaTareas.appendChild(li);

        });


        agregarEventos();

        actualizarEstadisticas();

    }


    /**
     * Agrega eventos a los botones.
     */
    function agregarEventos() {


        document
            .querySelectorAll(".btn-completar")
            .forEach(boton => {


                boton.addEventListener(
                    "click",
                    function () {


                        const id =
                            Number(this.dataset.id);


                        cambiarEstado(id);

                    }
                );


            });


        document
            .querySelectorAll(".btn-eliminar")
            .forEach(boton => {


                boton.addEventListener(
                    "click",
                    function () {


                        const id =
                            Number(this.dataset.id);


                        eliminarTarea(id);

                    }
                );


            });

    }


    /**
     * Completa o reabre una tarea.
     */
    function cambiarEstado(id) {

        const tarea =
            tareas.find(
                tarea => tarea.id === id
            );


        if (tarea) {

            tarea.completada =
                !tarea.completada;

        }


        renderizarTareas();

    }


    /**
     * Elimina una tarea.
     */
    function eliminarTarea(id) {

        tareas =
            tareas.filter(
                tarea => tarea.id !== id
            );


        renderizarTareas();

    }


    /**
     * Actualiza las estadísticas.
     */
    function actualizarEstadisticas() {

        document.getElementById(
            "totalTareas"
        ).textContent =
            tareas.length;


        document.getElementById(
            "tareasPendientes"
        ).textContent =
            contarPendientes(tareas);


        document.getElementById(
            "tareasCompletadas"
        ).textContent =
            contarCompletadas(tareas);

    }


    /**
     * Muestra mensajes.
     */
    function mostrarMensaje(
        texto,
        tipo
    ) {

        mensaje.textContent = texto;

        mensaje.className = tipo;


        setTimeout(() => {

            mensaje.textContent = "";

        }, 3000);

    }


    renderizarTareas();

}


/*
|--------------------------------------------------------------------------
| Exportación para las pruebas automatizadas
|--------------------------------------------------------------------------
*/

if (typeof module !== "undefined") {

    module.exports = {

        validarTarea,
        contarPendientes,
        contarCompletadas

    };

}