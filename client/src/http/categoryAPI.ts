import {$authHost} from "./index";

export const createCategory = async (name: string) => {
  const {data} = await $authHost.post('categories/', {name});
  return data;
}

export const removeCategory = async (id: number) => {
  const {data} = await $authHost.delete('categories/', {data: {id}});
  return data;
}

export const updateCategory = async (id: number, name: string) => {
  const {data} = await $authHost.patch('categories/', {id, name});
  return data;
}