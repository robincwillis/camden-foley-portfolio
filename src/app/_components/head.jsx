import NextHead from "next/head";

export default async function Head({ title }) {
  return (
    <NextHead>
      <title>{title}</title>
    </NextHead>
  );
}
