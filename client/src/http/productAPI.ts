import {$authHost} from "./index";

export const createProduct = async (formData: FormData) => {
    const {data} = await $authHost.post('products/', formData);
    return data;
}

export const removeProduct = async (id: number) => {
    const {data} = await $authHost.delete('products/', {data: {id}});
    return data;
}

export const updateProduct = async (formData: FormData) => {
    const {data} = await $authHost.patch('products/', formData);
    return data;
}