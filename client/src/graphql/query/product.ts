import {gql} from "@apollo/client";


export const GET_ALL_PRODUCTS = gql(`
    query getProducts {
        getProducts {
            count products {
                id name description discount categoryId weight isAvailable price img slug
            }
        }
    }
`)