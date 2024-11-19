import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      title
    }
  }
`;

export const GET_ALL_CATEGORIES_AND_TAGS = gql`
  query GetAllCategoriesAndTags {
    getAllCategories {
      id
      title
    }
    getAllTags {
      id
      name
    }
  }
`;

export const GET_ALL_ADS = gql`
  query GetAllAds($title: String) {
    getAllAds(title: $title) {
      id
      title
      description
      owner
      price
      location
      createdAt
      category {
        id
        title
      }
      pictures {
        id
        url
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      description
      owner
      price
      pictures {
        id
        url
      }
      location
      createdAt
      category {
        id
        title
      }
    }
  }
`;
