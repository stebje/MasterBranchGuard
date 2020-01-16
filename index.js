/*
This app will
- Automatically protect the master branch of a newly created repo
- Automatically create an issue which includes the details of the protections added, and a @mention
of the current GitHub user
*/

/* TODO
- Refactor functions, define outside of app
- Exception handling for octokit/probot responses
*/

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
    const branchProtections = {
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

    // Stringify and prettify branchProtections to be used in issue body with markdown
    app.log('Prettifying protection settings for markdown.')
    const branchProtectionsText = '```json' + '\n' + JSON.stringify(branchProtections, null, 4) + '\n' + '```'

    app.log('Applying protections on branch.')
    await context.github.repos.updateBranchProtection(branchProtections)

    // Create issue in repo, populate body with @mention + previous and protection rules added
    app.log('Creating issue in repo with @mention of user.')
    const issueTitle = `Hurray @${repoSenderLogin}, protections were added to your *${repoDefaultBranch}* branch!`
    const issueBody = `**Your *${repoDefaultBranch}* branch was updated with these protections;** \n ${branchProtectionsText}`
    await context.github.issues.create({ owner: repoOwnerLogin, repo: repoName, title: issueTitle, body: issueBody })
  })
}
