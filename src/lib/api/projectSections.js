import { fetchGraphQL, extractEntries } from "@/lib/utils/contentful";

const PROJECT_SECTION_GRAPHQL_FIELDS = `
    sys {
        id
    }
    title {
        json
    }
    description {
        json
    } 
    wrapDescription
    imagesCollection (limit: 10) {
        items {
            sys {
                id
            }
            url
            width
            height
            description
            
        }
    }
    mobileImagesCollection (limit: 10) {
        items {
            sys {
                id
            }
            url
            width
            height
            description
            
        }
    }
`;

export async function getProjectSections(ids, limit = 10, isDraftMode = false) {
  const query = `query {
    projectSectionCollection(where:{sys: {id_in: ["${ids.join('","')}"]}}, limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
            items {
                ${PROJECT_SECTION_GRAPHQL_FIELDS}
            }
        }
    }`;
  const projectSections = await fetchGraphQL(query, isDraftMode, [
    "projectSections",
  ]);
  return extractEntries(projectSections, "projectSectionCollection");
}
