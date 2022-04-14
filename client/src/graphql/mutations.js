import { gql } from '@apollo/client';

export const SIGN_UP_USER = gql`
mutation signupUser($userNew: UserInput!) {
  signupUser(userNew: $userNew) {
    id
    email
    firstName
    lastName
  }
}
`;

export const LOGIN_USER = gql`
mutation signinUser($userLogin: UserLoginInput!) {
    signinUser(userLogin: $userLogin) {
        token
    }
}
`;