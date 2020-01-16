/*
* This app will
* 1.Automatically protect the master branch of a newly created repo
* 2.Automatically create an issue which includes the details of the protections added, and a @mention
* of the current GitHub user
* */

module.exports = app => {
  app.log('The app is up and running!')

  // Event for new repos
  app.on('repository.created', async context => {
    app.log('A new repository has been created!')

    // Get context variables from repository
    app.log('Collecting context parameters of repository.')
    const repoName = context.payload.repository.name
    const repoDefaultBranch = context.payload.repository.default_branch
    const repoOwnerLogin = context.payload.repository.owner.login
    const repoSenderLogin = context.payload.sender.login

    // Define protection parameters
    app.log('Defining protection parameters.')
    var branchProtections = {
      owner: repoOwnerLogin,
      repo: repoName,
      branch: repoDefaultBranch,
      required_status_checks: null,
      enforce_admins: null,
      required_pull_request_reviews: {
        require_code_owner_review: true
      },
      restrictions: null
    }

    // Stringify branchProtections to be used in issues
    var branchProtectionsString = JSON.stringify(branchProtections)

    // Apply protection parameters on branch
    app.log('Applying protections on branch.')
    context.github.repos.updateBranchProtection(branchProtections)

    // Create issue in repo, populate body with @mention + previous and current protection rules
    app.log('Creating issue in repo with @mention of user.')
    const issueTitle = `@${repoSenderLogin}, protections have been added to ${repoDefaultBranch}!`
    const issueBody = '**Your master branch was updated with these protections;**' + '\n' + '```' + 'json' + '\n' + `${branchProtectionsString}` + '\n' + '```'
    context.github.issues.create({ owner: repoOwnerLogin, repo: repoName, title: issueTitle, body: issueBody })
  })
}
