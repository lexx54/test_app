// src/components/TextComparison.tsx
import React from 'react';
import parse from 'html-react-parser';
interface Change {
  text: string;
  added: boolean;
  removed: boolean;
}

interface TextComparisonProps {
  originalText: string;
  updatedText: string;
  changes: Change[];
}

const setBreaks = (text: string) => {
  return text.replace(/\n/g, '<br />');
}
function wrapSections(text: string) {
  return text
    .replace(/(?<!\d)(section 1|section 2|section 3)(?!\d)./gi, '<p className="py-4 text-lg text-cyan-600 font-semibold capitalize text-center">$1</p>');
}
function normalizeString(str: string) {
  // Remove HTML tags
  console.log(str)
  const strippedString = str.replace(/<[^>]*>/g, '').trim();
  // Replace newlines and multiple spaces with a single space
  const againString = strippedString.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();

  return againString.toLowerCase();
}

const TextComparison: React.FC<TextComparisonProps> = ({ originalText, updatedText, changes }) => {
  const renderTextWithHighlights = (text: string, isUpdated: boolean) => {
    let highlightedText = normalizeString(text);


    changes.forEach(change => {
      const { text: changeText, added, removed } = change;

      // Highlight added text in updated text
      if (isUpdated && added) {
        highlightedText = highlightedText.replace(normalizeString(changeText), `<span className="bg-green-400 text-white font-bold px-2 py-1 rounded-lg">${changeText}</span>`);
      }
      // Highlight removed text in original text
      else if (!isUpdated && removed) {
        highlightedText = highlightedText.replace(normalizeString(changeText), `<span className="bg-red-400 text-white font-bold px-2 py-1 rounded-lg">${changeText}</span>`);
      }
    });

    return highlightedText;
  };

  return (
    <div className='flex justify-around'>
      <div className="w-[45%] bg-gray-200 rounded-lg text-justify overflow-y-auto box-shadow">
        <h3 className='text-3xl font-semibold text-center py-4 bg-cyan-600'>Original Text</h3>
        {/* {originalText} */}
        <div className='px-8 py-4'>
          {parse(wrapSections(setBreaks(renderTextWithHighlights(originalText, false))))}
        </div>
      </div>
      <div className="w-[45%] bg-gray-200 rounded-lg text-justify overflow-y-auto box-shadow">
        <h3 className='text-3xl font-semibold text-center py-4 bg-cyan-600'>Updated Text</h3>
        {/* {updatedText} */}
        <div className='px-8 py-4'>
          {parse(wrapSections(setBreaks(renderTextWithHighlights(updatedText, true))))}
        </div>
      </div>
    </div>
  );
};

export default TextComparison;
