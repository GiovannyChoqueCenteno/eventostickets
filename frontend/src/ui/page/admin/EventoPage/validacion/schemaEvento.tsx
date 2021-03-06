import * as yup from 'yup';

export const schemaEvento = yup.object().shape({
    descripcion: yup.string().required('el campo descripcion es requerido').min(10, 'la descripcion debe tener de al menos 10 caracteres'),
    organizador: yup.string().required('el campo organizador es requerido').min(3, 'el organizador debe tener de al menos 3 caracteres'),
    titulo: yup.string().required('el campo titulo es requerido').min(3, 'el titulo debe tener de al menos 3 caracteres'),
});
