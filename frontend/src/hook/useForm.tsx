import { useState } from 'react';

const useForm = <T extends object>(initialValue: T) => {

    const [value, setvalue] = useState<T>(initialValue);

    const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setvalue({
            ...value,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    const onChangeSelect = (e: React.FormEvent<HTMLSelectElement>, field: string) => {
        setvalue({
            ...value,
            [field]: e.currentTarget.value
        });
    }

    const setField = (field: string, dato: any) => {
        setvalue({
            ...value,
            [field]: dato
        });
    }
    const setData = (data: object) => {
        setvalue({
            ...value,
            ...data
        });
    }

    const reset = () => {
        setvalue(initialValue);
    }

    return {
        value,
        onChange,
        onChangeSelect,
        setField,
        setData,
        reset
    }
}

export default useForm
