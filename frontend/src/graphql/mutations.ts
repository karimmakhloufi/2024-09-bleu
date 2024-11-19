import { gql } from "@apollo/client";

export const CREATE_NEW_AD = gql`
  mutation CreateNewAd($data: AdInput!) {
    createNewAd(data: $data) {
      id
    }
  }
`;

export const DELETE_AD_BY_ID = gql`
  mutation DeleteAdById($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;
