
// src/components/TextComparison.tsx
import React from 'react';
import parse from 'html-react-parser';
interface Change {
  text: string;
  added: boolean;
  removed: boolean;
  summary: string;
}

interface TextComparisonProps {
  originalText: string;
  updatedText: string;
  changes: Change[];
}

function wrapSections(text: string) {
  return text
    .replace(/(?<!\d)(section 1|section 2|section 3)(?!\d)./gi, '<p className="py-4 text-lg text-cyan-600 font-semibold capitalize text-center">$1</p>');
}


const TextComparison: React.FC<TextComparisonProps> = ({ originalText, updatedText, changes }) => {
  const renderTextWithHighlights = (text: string, isUpdated: boolean) => {
    let highlightedText = text;

    changes.forEach((change) => {
      const { text: changeText, added, removed, summary } = change;

      // Escape special characters for regex
      const escapedChangeText = changeText
        .replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&') // Escape special regex characters
        .replace(/[\s]+/g, '\\s*') // Handle spaces
        .replace(/\n/g, '\\n'); // Handle newlines

      const regex = new RegExp(escapedChangeText, 'g');

      if (isUpdated && added) {
        highlightedText = highlightedText.replace(regex, `<span className="bg-green-400 text-white font-bold px-2 py-1 rounded-lg">${summary}</span>`);
      }
      // Highlight removed text in original text
      else if (!isUpdated && removed) {
        highlightedText = highlightedText.replace(regex, `<span className="bg-red-400 text-white font-bold px-2 py-1 rounded-lg">${summary}</span>`);
      }
    });

    return parse(wrapSections(`<div className="whitespace-pre-wrap">${highlightedText}</div>`));
  };

  return (
    <div className='flex justify-around'>
      <div className="w-[45%] bg-gray-200 rounded-lg text-justify overflow-y-auto box-shadow">
        <h3 className='text-3xl font-semibold text-center py-4 bg-cyan-600'>Original Text</h3>
        <div className='px-8 py-4'>
          {renderTextWithHighlights(originalText, false)}
        </div>
      </div>
      <div className="w-[45%] bg-gray-200 rounded-lg text-justify overflow-y-auto box-shadow">
        <h3 className='text-3xl font-semibold text-center py-4 bg-cyan-600'>Updated Text</h3>
        <div className='px-8 py-4'>
          {renderTextWithHighlights(updatedText, true)}
        </div>
      </div>
    </div>
  );
};

export default TextComparison;
