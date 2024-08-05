import { fetchGraphQL, extractEntries } from "@/lib/utils/contentful";

const SITE_GRAPHQL_FIELDS = `
    sys {
        id
    }
    title
    description
    keywords
    copyright
    footerLinksCollection {
        items {
            sys {
                id
            }
            label
            to
            asset {
              url
            }
        }
    }

`;

export async function getSite(id, isDraftMode = false) {
  const query = `query {
        siteCollection(where:{id: "${id}"}, limit: 1, preview: ${
          isDraftMode ? "true" : "false"
        }) {
          items {
            ${SITE_GRAPHQL_FIELDS}
          }
        }
      }`;
  const site = await fetchGraphQL(query, isDraftMode, ["site"]);
  return extractEntries(site, "siteCollection")[0];
}
