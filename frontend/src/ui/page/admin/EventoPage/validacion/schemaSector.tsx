import * as yup from 'yup';

export const schemaSector = yup.object().shape({
    capacidad: yup.number().required('el valor de la capacidad es requerido').min(5, 'la capacidad minima aceptada es de 5'),
    nombre: yup.string().required('el campo nombre es requerido').min(3, 'el nombre debe tener de al menos 3 caracteres'),
});
