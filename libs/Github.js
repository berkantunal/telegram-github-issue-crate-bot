const github = require('github-api');

const Github = (token, user, repository) => {
    const gh = new github({
        token
    });

    createIssue = async (issueData) => {
        let title = issueData.title
        title += `- Issue Time: ${issueData.date}, `
        title += `User id: ${issueData.userId}, `
        title += `Ride id: ${issueData.rideId || "-"}`

        let body = `${issueData.description} `
        body += `- Reporter ${issueData.from.firstName} ${issueData.from.lastName}`

        return new Promise((resolve, reject) => {
            try {
                const repo = gh.getIssues(user, repository);

                repo.createIssue({
                    title,
                    body,
                    labels: ['bug']
                }, (data) => {
                    resolve(data)
                });
            } catch (err) {
                reject(err)
            }
        })
    };

    return {
        createIssue,
    };
};

module.exports = Github;