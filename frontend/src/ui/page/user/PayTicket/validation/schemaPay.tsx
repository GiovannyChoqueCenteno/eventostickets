import * as yup from 'yup';

export const schemaPay = yup.object().shape({
    fecha: yup.string().required("el campo fecha es requerido"),
    cvc: yup.string().required("el campo cvc es requerido"),
    card: yup.string().required("el campo card es requerido"),
    nombre: yup.string().required('el campo name es requerido').min(3, 'el name debe tener de al menos 3 caracteres'),
});
