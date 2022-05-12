import * as yup from 'yup';

export const schemaHorario = yup.object().shape({
    duracion: yup.number().required('el campo duracion es requerido').min(1, 'la minima duracion es 1 hora').max(8, "La maxima duracion es 8 horas"),
    hora: yup.string().required('el campo hora es requerido').min(1, 'debe agregar una hora'),
    fecha: yup.string().required('el campo fecha es requerido').min(1, 'debe agregar una fecha'),
});
