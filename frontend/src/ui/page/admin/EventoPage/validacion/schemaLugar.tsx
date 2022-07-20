import * as yup from 'yup';

export const schemaLugar = yup.object().shape({
    latitud: yup.string().required('el punto de ubicacion es requerido'),
    longitud: yup.string().required('el punto de ubicacion es requerido'),
    capacidad: yup.number().required('el valor de la capacidad es requerido').min(10, 'la capacidad minima aceptada es de 10'),
    direccion: yup.string().required('el campo direccion es requerido').min(10, 'el direccion debe tener de al menos 10 caracteres'),
    nombre: yup.string().required('el campo nombre es requerido').min(3, 'el nombre debe tener de al menos 3 caracteres'),
});
