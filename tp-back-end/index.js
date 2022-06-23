const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = graphql;
const { graphqlHTTP } = require("express-graphql");
const tasks = require("./assets/TaskData.json");
const cors = require("cors");

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    currentStatus: { type: GraphQLString },
    taskDuration: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllTasks: {
      type: new GraphQLList(TaskType),
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return tasks;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createTask: {
      type: TaskType,
      args: {
        name: { type: GraphQLString },
        currentStatus: { type: GraphQLString },
        taskDuration: { type: GraphQLString },
      },
      resolve(parent, args) {
        tasks.push({
          id: tasks.length + 1,
          name: args.name,
          currentStatus: args.currentStatus,
          taskDuration: args.taskDuration,
        });
        return args;
      },
    },
  },
});


const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

app.use(cors());

app.use(
  "/graphql", 
  bodyParser.json(),
  graphqlHTTP({
    schema: schema,
    graphiql: true, //optional
  })
);

app.get("/", (req, res) => {
  res.send(tasks);
  res.end();
});

app.listen(3000, () => console.log("Server is running on port 3000"));


