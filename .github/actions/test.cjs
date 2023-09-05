const { Octokit } = require('@octokit/action');

const client = new Octokit();

const repositoryOwner = 'interledger';
const repositoryName = 'rafiki';
const repositoryId = 'MDEwOlJlcG9zaXRvcnkzNTczMDkwMzg';
const weeklySyncCategoryId = 'DIC_kwDOFUwabs4CYzGl';
const ideasCategoryId = 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyODYxMjMy';

async function test() {
	const discussions = await client.graphql(
		`query GetRepositoryIdeas($name: String!, $owner: String!, $categoryId: ID!) {
            repository(name: $name, owner: $owner) {
                discussions(
                    orderBy: { direction: ASC, field: CREATED_AT }
                    categoryId: $categoryId
                    states: OPEN
                    last: 20
                ) {
                    edges {
                        node {
                            id
                            title
                            createdAt
                        }
                    }
                }
            }
        }`,
		{
			name: repositoryName,
			owner: repositoryOwner,
			categoryId: ideasCategoryId
		}
	);
	console.log(JSON.stringify(discussions, null, 2));
}

test();
