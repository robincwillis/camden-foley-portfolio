import { fetchGraphQL, extractEntries } from '@/lib/utils/contentful'

const COLLECTION_GRAPHQL_FIELDS = `
    sys {
        id
    }
    name
    description
    slug
    heroImage {
        url
        width
        height
        description
    }
    projectsCollection (limit: 20) {
        items {
            sys {
                id
            }
        }
    }
`

export async function getCollection (
    slug,
    isDraftMode = false
) {
    const query = `query {
        collectionCollection(where:{slug: "/${slug}"}, limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${COLLECTION_GRAPHQL_FIELDS}
          }
        }
      }`
    const collection = await fetchGraphQL(query, isDraftMode, ['collections'])
    return extractEntries(collection, 'collectionCollection')[0]

}