export function extractEntries(fetchResponse, collectionKey) {
  console.log(fetchResponse);
  return fetchResponse?.data[collectionKey]?.items;
}

export function getCollectionIds(collection) {
  return collection?.items?.map(({ sys }) => sys.id);
}

export async function fetchGraphQL(query, preview = false, tags = []) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Switch the Bearer token depending on whether the fetch is supposed to retrieve live
        // Contentful content or draft content
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      // Associate all fetches for articles with an "articles" cache tag so content can
      // be revalidated or updated from Contentful on publish
      next: { tags },
    },
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
}
