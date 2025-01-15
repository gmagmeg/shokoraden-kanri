import React from "react";

type XPostButtonProps = {
  title: string;
  impression: string;
  url: string;
  isDisabled: boolean;
};

export const XPostButton: React.FC<XPostButtonProps> = ({
  title,
  impression,
  url,
  isDisabled
}) => {
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}\n${impression}\n#書庫らでん\n`)}&url=${encodeURIComponent(url)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#3c7c71] rounded-lg hover:bg-[#3c7c71] ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
        }
      }}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      #書庫らでん で投稿する
    </a>
  );
};