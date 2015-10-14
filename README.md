# dms-mongo

```A simple document management system```

Create a clone of this repository

On your command line: 
- Navigate to the project directory
- start mongo db service. (visit https://docs.mongodb.org/manual/ for more information)
- Run `npm test` to run the Spec for the app

  Format for database query through a command line interface.
- To create new user
```createnewuser "firstname", "lastname"```

- To get all users
```getusers --all```

- To create new role
```createRole "title"```

- To get all roles
```getroles --all```

- TO create new document
```createnewdoc "title"```

- To get All documents
```getalldocs limit```

- To get All documents by role
```getalldocs "role" limit```

- To get All documents by date
```getalldocs "date" limit```