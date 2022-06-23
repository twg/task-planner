import { gql } from "apollo-angular";

export const GET_TASKS = gql`
query{
    getAllTasks{
     id
      name
      currentStatus
      taskDuration
    }
  }
  `