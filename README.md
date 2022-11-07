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

## Next 3 issues

### Issue Nr. 1

From the response above, extract the following key.

```
"corporateImage": [
          {
            "_id": "636810fca4ce492a4acbf9da",
            "name": "Tui",
            "imageContentUrl": [
              "https://cuttevents-app.s3.eu-central-1.amazonaws.com/imageContentUrl-1667764476116.png"
            ],
            "colorPalette": [
              "#737373",
              "#219ed9",
              "#0d3b85"
            ],
            "fonts": [
              "Roboto",
              "sans-serif"
            ]
```

1. The page should have a default style configuration as it is now.
2. If the corporateImage comes as an empty array, the logo and the styling should be as it is now. Nothing should change
3. If there is an object present in the corporateImage array, then on load of the main section, the new logo (imageContentUrl) should be uploaded, and there should be a change in the whole app color palette and text font.
4. The styling configuration should persist on logouts / logins.

### Issue Nr. 2

1. Debug morning meeting, afternoon meeting and full day meeting lines on the budget. The Budget state is managed globally, ,partly in redux, partly in a context. If possible, I would prefer to manage everything in context. The selects should capture changes in the select input, and the amounts should update.

### Issue Nr. 3

1. The total budget is computed by using a function. I would need your expertise here, but I have a feeling that it would be better to have a reducer adding all the line totals of the budget, rather than a function.
