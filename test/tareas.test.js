const {

    validarTarea,
    contarPendientes,
    contarCompletadas

} = require("../public/js/tareas");


/*
|--------------------------------------------------------------------------
| PRUEBAS DE VALIDACIÓN
|--------------------------------------------------------------------------
*/


describe(
    "Validación de tareas",
    () => {


        test(
            "Una tarea válida debe ser aceptada",
            () => {

                expect(
                    validarTarea("Estudiar GitHub Actions")
                ).toBe(true);

            }
        );


        test(
            "Una tarea vacía debe ser rechazada",
            () => {

                expect(
                    validarTarea("")
                ).toBe(false);

            }
        );


        test(
            "Una tarea con menos de 3 caracteres debe ser rechazada",
            () => {

                expect(
                    validarTarea("AB")
                ).toBe(false);

            }
        );


        test(
            "Los espacios no deben considerarse una tarea válida",
            () => {

                expect(
                    validarTarea("     ")
                ).toBe(false);

            }
        );


    }
);


/*
|--------------------------------------------------------------------------
| PRUEBAS DE ESTADÍSTICAS
|--------------------------------------------------------------------------
*/


describe(
    "Estadísticas de las tareas",
    () => {


        const tareas = [

            {
                nombre: "Configurar Git",
                completada: false
            },

            {
                nombre: "Crear repositorio",
                completada: true
            },

            {
                nombre: "Crear pipeline",
                completada: false
            },

            {
                nombre: "Ejecutar pruebas",
                completada: true
            }

        ];


        test(
            "Debe contar correctamente las tareas pendientes",
            () => {

                expect(
                    contarPendientes(tareas)
                ).toBe(2);

            }
        );


        test(
            "Debe contar correctamente las tareas completadas",
            () => {

                expect(
                    contarCompletadas(tareas)
                ).toBe(2);

            }
        );


    }
);