const sessionTypeDefs = `#graphql
type Session {
    _id: ID
    taskId: ID
    name: String
    isDone: Boolean
    duration: Int
    createdAt: String
    UpdatedAt: String
}

input NewSession {
    taskId: ID
    name: String
    isDone: Boolean = false
    duration: Int
    createdAt: String
    updatedAt: String
}

type Query {
    getSession(_id: ID): Session
}

type Mutation {
    create(NewSession: NewSession): Session
    SessionDone(isDone: Boolean): String
}
`;
