Task: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/graphql-service/assignment.md
Deadline: 2023-01-31 04:00

Basic Scope
+72 Task 1: restful endpoints.
+72 Subtasks 2.1-2.7: get gql queries.
+54 Subtasks 2.8-2.11: create gql queries.
+54 Subtasks 2.12-2.17: update gql queries.
+88 Task 3: solve n+1 graphql problem.
+20 Task 4: limit the complexity of the graphql queries.

Score: 72

Query

2.1. Get users, profiles, posts, memberTypes - 4 operations in one query:

```
{
  users {
    firstName
    email
    lastName
    subscribedToUserIds
    id
  }
  profiles {
    avatar
    birthday
    city
    country
    id
    memberTypeId
    sex
    street
    userId
  }
  posts {
    content
    id
    title
    userId
  }
  memberTypes {
    discount
    id
    monthPostsLimit
  }
}
```

2.2 - 2.3:

```
query GetEntity($userId: String, $profileId: String, $memberTypeId: String, $postId: String){
    user(id: $userId){
        id
        email
        firstName
        lastName
        subscribedToUserIds
        posts {
            content
            id
            title
            userId
        }
        profile {
            street
            avatar
            birthday
            city
            country
            id
            memberTypeId
            sex
            userId
        }
        memberType {
            discount
        }
    }
    profile(id: $profileId) {
        avatar
        birthday
        city
        country
        id
        memberTypeId
        sex
        street
        userId
    }
    memberType(id: $memberTypeId) {
        discount
        id
        monthPostsLimit
    }
    post(id: $postId) {
        content
        userId
        id
        title
    }
}
```

Variables:

```
{
    "userId": "3034b786-65e3-4360-95fa-aca4ca93600f",
    "profileId": "96960590-5242-49c2-b75e-2ffd11f2f190",
    "memberTypeId": "basic",
    "postId": "6ca58899-3eec-40e8-b887-4dfd73092396"
}
```
