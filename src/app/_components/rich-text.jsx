"use client"

import React from 'react';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


const defaultClassNames = {
    paragraph: 'mb-4 text-base text-gray-700',
    heading1: 'text-4xl font-bold mb-6',
    heading2: 'text-3xl font-semibold mb-5',
    heading3: 'text-2xl font-medium mb-4',
    heading4: 'text-xl font-medium mb-3',
    heading5: 'text-lg font-medium mb-2',
    heading6: 'text-base font-medium mb-1',
    ulList: 'list-disc pl-5 mb-4',
    olList: 'list-decimal pl-5 mb-4',
    listItem: 'mb-2',
    blockquote: 'border-l-4 border-gray-400 pl-4 italic mb-4',
    hr: 'border-t-2 border-gray-300 my-4',
    hyperlink: 'text-blue-600 underline',
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  };

// Custom rendering options
const getOptions = (classNames) => ({
    renderMark: {
      [MARKS.BOLD]: (text) => <strong className={classNames.bold}>{text}</strong>,
      [MARKS.ITALIC]: (text) => <em className={classNames.italic}>{text}</em>,
      [MARKS.UNDERLINE]: (text) => <u className={classNames.underline}>{text}</u>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={classNames.paragraph}>{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className={classNames.heading1}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className={classNames.heading2}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className={classNames.heading3}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className={classNames.heading4}>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <h5 className={classNames.heading5}>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (node, children) => (
        <h6 className={classNames.heading6}>{children}</h6>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className={classNames.ulList}>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol className={classNames.olList}>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className={classNames.listItem}>{children}</li>
      ),
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className={classNames.blockquote}>{children}</blockquote>
      ),
      [BLOCKS.HR]: () => <hr className={classNames.hr} />,
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames.hyperlink}
        >
          {children}
        </a>
      ),
    },
  });

// TODO set defaultClassNames
export default function RichText({ document, classNames={} }) {
    const options = getOptions(classNames);
    return documentToReactComponents(document, options)
}