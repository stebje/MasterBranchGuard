# Future improvements
* Refactoring of index.js for better abstraction of functions, e.g. isolate function call for updating branch protection rules
* Add exception handling for several scenarios
  * HTTP responses received from GitHub != 20x, e.g. 401 Unauthorized
  * Repositories created [without branches](https://stackoverflow.com/questions/21252876/git-repository-created-without-a-master-branch)
* Add [tests](test/index.test.js)
* Add app to [Probot featured apps](https://probot.github.io/apps/)