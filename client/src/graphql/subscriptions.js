import { gql } from '@apollo/client';

export const MSG_SUB = gql`
subscription NewMessage {
  newMessage {
    id
    text
    receiverId
    senderId
    createdAt
  }
}
`;