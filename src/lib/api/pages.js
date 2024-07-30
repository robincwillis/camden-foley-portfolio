import { fetchGraphQL, extractEntries } from "@/lib/utils/contentful";

const ALL_PAGES_GRAPHQL_FIELDS = `
    sys {
        id
    }
    title
    slug
`;

const PAGE_GRAPHQL_FIELDS = `
    sys {
        id
    }
    title
    description
    slug
    sectionsCollection {
        items {
            sys {
                id
            }
            image {
                url
                width
                height
                description
            }
            headline
            subHeadline
            body {
                json
            }
            tags
        }
    }
`;

export async function getAllPages(limit = 100, isDraftMode = false) {
  const query = `query {
        pageCollection(where:{slug_exists: true}, limit: ${limit}, preview: ${
          isDraftMode ? "true" : "false"
        }) {
            items {
                ${ALL_PAGES_GRAPHQL_FIELDS}
            }
        }
    }`;

  const pages = await fetchGraphQL(query, isDraftMode, ["pages"]);
  return extractEntries(pages, "pageCollection");
}

export async function getPage(slug, isDraftMode = false) {
  const query = `query {
        pageCollection(where:{slug: "/${slug}"}, limit: 1, preview: ${
          isDraftMode ? "true" : "false"
        }) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
        }
      }`;

  const page = await fetchGraphQL(query, isDraftMode, ["pages"]);
  return extractEntries(page, "pageCollection")[0];
}
