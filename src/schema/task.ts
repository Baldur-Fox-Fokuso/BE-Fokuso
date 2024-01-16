const taskTypeDefs = `#graphql

type Task {
    _id: ID
    userId: ID
    name: String
    sessions: [Session]
    createdAt: String
    UpdatedAt: String
}

input NewTask {
    userId: ID!
    name: String!
}

type Session {
    _id: ID
}

type Query {
    getTasks(userId: ID): [Task]
    getTask(_id: ID): Task
}

type Mutation {
    create(NewTask: NewTask): Task
}
`;
