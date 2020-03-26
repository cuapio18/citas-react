import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4'

const Formulario = ({crearCita}) => {

    // Crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    // FUNCION QUE SE EJECUTA CADA QUE UN USUARIO ESCRIBE EN UN INPUT
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        });
    };

    // Extraer valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // Cuando el usuario presione agregar cita
    const submitCita = e => {
        e.preventDefault(); // Prvenir accion por default

        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            return;
        }

        // Eliminar mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });

    }

    return ( 
        <Fragment>
            <h2 className="pd-0">Crear cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form 
            onSubmit={submitCita}>

                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary">Agregar cita</button>

            </form>
        </Fragment>
     );
}
 
export default Formulario;