const github = require("github-api");

const Github = (token, user, repository) => {
    const gh = new github({
        token
    });

    createIssue = async (issueData) => {
        let title = issueData.title
        title += `- Issue Time: ${issueData.date}, `
        title += `User id: ${issueData.userId}, `
        title += `Ride id: ${issueData.rideId || "-"}`

        return new Promise((resolve, reject) => {
            try {
                const repo = gh.getIssues(user, repository);

                repo.createIssue({
                    title,
                    body: issueData.description
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