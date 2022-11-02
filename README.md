## About the Project

This app will be a tool for agencies in the MICE Industry that will allow them to pitch for new business in a web-based format, replacing the traditional PowerPoint + Excel approach

## Git Flow

1. When new features or fixes are required, we create a new issue
2. Issues are assigned to at least 1 collaborator
3. The number of the issue is created as a new branch name, following git branch naming conventions:
   [Git Branch Naming Conventions](https://deepsource.io/blog/git-branch-naming-conventions/)
4. Once the issue is resolved, a new pull-request (PR) from your branch to master is required

---

## Very brief documentation on projects endpoint

Upon LoginPage component, the handleSubmit function, makes a get request to ...

`const response = await baseAPI.get(`/v1/projects?code=${password}`)`

where the baseAPI is [BackEnd URL](https://backendcuttevents.herokuapp.com)

### Request example

[Click here for an example of a response if you introduce BMMTEST2011 as a password in the login](https://backendcuttevents.herokuapp.com/v1/projects?code=BMMTEST2011)
