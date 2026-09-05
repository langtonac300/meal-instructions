import * as React from 'react';
export interface ShareButtonProps {
  /** Telegram-style text copied by SMS TO SPOUSE. */
  smsText?: string;
  /** Markdown copied by AI / LLM MARKDOWN. */
  markdown?: string;
  onPrint?: () => void;
  showMarkdown?: boolean;
  /** Small COPY FOR SMS / PRINT pair (components/ShareButton.tsx) instead of the recipe-page toolbar. */
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function ShareButton(props: ShareButtonProps): JSX.Element;
