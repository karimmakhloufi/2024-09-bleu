import { gql } from "@apollo/client";

export const CREATE_NEW_AD = gql`
  mutation Mutation($data: AdInput!) {
    createNewAd(data: $data) {
      id
    }
  }
`;
