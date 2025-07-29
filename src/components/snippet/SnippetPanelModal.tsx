import { useState } from "react";
import { ScoredResult } from "@/lib/scorer";
import { componentSnippets } from "@/data/componetSnippets";
import { Component } from "@/types";

interface SnippetPanelModalProps {
  result: ScoredResult;
  onClose: () => void;
}

export const SnippetPanelModal = ({
  result,
  onClose,
}: SnippetPanelModalProps) => {
  const [copied, setCopied] = useState(false);
  const { item } = result;

  const snippetKey = (item as Component).codeExample;
  const snippet = snippetKey ? componentSnippets[snippetKey] : null;

  const handleCopy = async () => {
    if (!snippet) return;
    const importStatement = `import { ${snippet.imports.join(
      ", "
    )} } from '@visa/nova-react';`;
    const fullCode = `${importStatement}\n\n${snippet.code}`;

    await navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Modal Header */}
      <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal Body */}
      <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
        {snippet ? (
          <>
            {/* Code Section */}
            <div className="border-b border-gray-200">
              <div className="px-8 py-4 bg-gray-900">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold">Code Example</h3>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-[#1434CB] text-white rounded hover:bg-[#021E4C] transition-colors text-sm"
                  >
                    {copied ? "✓ Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code className="language-jsx">
                    {`import { ${snippet.imports.join(
                      ", "
                    )} } from '@visa/nova-react';\n\n${snippet.code}`}
                  </code>
                </pre>
              </div>
            </div>

            {/* A11y Notes */}
            {item.a11yNotes && item.a11yNotes.length > 0 && (
              <div className="px-8 py-6 bg-blue-50">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Accessibility Guidelines
                </h3>
                <ul className="space-y-2">
                  {item.a11yNotes.map((note, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <svg
                        className="w-5 h-5 text-[#1434CB] mr-2 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="px-8 py-12 text-center text-gray-500">
            <p>No code example available for this component yet.</p>
          </div>
        )}
      </div>
    </>
  );
};
