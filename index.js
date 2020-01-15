/*
* This app will
* 1.Automatically protect the master branch of a newly created repo
* 2.Automatically create an issue which includes the details of the protections added, and a @mention
* of the current GitHub user
* */

module.exports = app => {
  app.log('The app is up and running!')

  // Trigger for when new repos are created
  app.on('issues.opened', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   { owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World! }
    const params = context.issue({ body: 'This is an auto-generated comment for a new issue!' })

    // Post a comment on the issue
    return context.github.issues.createComment(params)
  })
}
