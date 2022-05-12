import * as yup from 'yup';

export const schemaEspacio = yup.object().shape({
    cantidad: yup.number().required('el valor de la cantidad es requerido').min(3, 'la capacidad minima aceptada es de 3'),
    capacidad: yup.number().required('el valor de la capacidad es requerido').min(1, 'la capacidad minima aceptada es de 1'),
    descripcion: yup.string().required('el campo descripcion es requerido').min(10, 'la descripcion debe tener de al menos 10 caracteres'),
    nombre: yup.string().required('el campo name es requerido').min(3, 'el name debe tener de al menos 3 caracteres'),
});
