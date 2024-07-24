import { fetchGraphQL, extractEntries } from '@/lib/utils/contentful'

const ALL_PROJECT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  slug
  date
  client
  locked
  tags
  heroImage {
    url
    width
    height
    description
  }
`

const PROJECT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  name
  slug
  date
  client
  locked
  tags
  brief {
    json
  }
  team {
    json
  }
  role {
    json
  }
  highlights {
    json
  }
  closing {
    json
  }
  heroImage {
    url
    width
    height
    description
  }
  sectionsCollection(limit: 10) {
    items {
      sys {
        id
      }
    }
  }
`

export async function getAllProjects(
  limit = 100,
  isDraftMode = false
) {


  // TODO order: date_DESC
  const query = `query {
        projectCollection(where:{slug_exists: true}, limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${ALL_PROJECT_GRAPHQL_FIELDS}
          }
        }
      }`
  
  const projects = await fetchGraphQL(
    query,
    isDraftMode,
    ['projects']
  )
  return extractEntries(projects, 'projectCollection')
}

export async function getProject(
  slug,
  isDraftMode = false
) {
  const project = await fetchGraphQL(
    `query {
        projectCollection(where:{slug: "/${slug}"}, limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${PROJECT_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  );
  return extractEntries(project, 'projectCollection')[0];
}