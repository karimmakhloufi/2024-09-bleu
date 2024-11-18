import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category?: Maybe<Category>;
  createdAt: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  pictures: Array<Picture>;
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type AdInput = {
  category: Scalars['ID']['input'];
  createdAt: Scalars['DateTimeISO']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  picturesUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewAd: Ad;
  deleteAd: Scalars['String']['output'];
  updateAd: Scalars['String']['output'];
};


export type MutationCreateNewAdArgs = {
  data: AdInput;
};


export type MutationDeleteAdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateAdArgs = {
  data: UpdateAdInput;
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAdById: Ad;
  getAllAds: Array<Ad>;
  getAllCategories: Array<Category>;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['Float']['input'];
};

export type UpdateAdInput = {
  category?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MutationMutationVariables = Exact<{
  data: AdInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', createNewAd: { __typename?: 'Ad', id: number } };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, title: string }> };

export type GetAllAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdsQuery = { __typename?: 'Query', getAllAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, category?: { __typename?: 'Category', id: number, title: string } | null, pictures: Array<{ __typename?: 'Picture', id: number, url: string }> }> };

export type GetAdByIdQueryVariables = Exact<{
  getAdByIdId: Scalars['Float']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, price: number, location: string, createdAt: any, pictures: Array<{ __typename?: 'Picture', id: number, url: string }>, category?: { __typename?: 'Category', id: number, title: string } | null } };


export const MutationDocument = gql`
    mutation Mutation($data: AdInput!) {
  createNewAd(data: $data) {
    id
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
  getAllCategories {
    id
    title
  }
}
    `;

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
      }
export function useGetAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export function useGetAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>(GetAllCategoriesDocument, options);
        }
export type GetAllCategoriesQueryHookResult = ReturnType<typeof useGetAllCategoriesQuery>;
export type GetAllCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesLazyQuery>;
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesSuspenseQuery>;
export type GetAllCategoriesQueryResult = Apollo.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const GetAllAdsDocument = gql`
    query GetAllAds {
  getAllAds {
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
  }
}
    `;

/**
 * __useGetAllAdsQuery__
 *
 * To run a query within a React component, call `useGetAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
      }
export function useGetAllAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export function useGetAllAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export type GetAllAdsQueryHookResult = ReturnType<typeof useGetAllAdsQuery>;
export type GetAllAdsLazyQueryHookResult = ReturnType<typeof useGetAllAdsLazyQuery>;
export type GetAllAdsSuspenseQueryHookResult = ReturnType<typeof useGetAllAdsSuspenseQuery>;
export type GetAllAdsQueryResult = Apollo.QueryResult<GetAllAdsQuery, GetAllAdsQueryVariables>;
export const GetAdByIdDocument = gql`
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

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      getAdByIdId: // value for 'getAdByIdId'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables> & ({ variables: GetAdByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;