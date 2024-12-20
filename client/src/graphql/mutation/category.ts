import {gql} from "@apollo/client";

export const CREATE_CATEGORY = gql(`
    mutation createCategory($name: String) {
        createCategory(name: $name) {
            id name
        }
    }
`);

export const REMOVE_CATEGORY = gql(`
    mutation removeCategory($id: ID) {
        removeCategory(id: $id) {
            id name
        }
    }
`)