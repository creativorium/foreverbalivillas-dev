'use client';

import { useEffect } from 'react';

interface Props {
  headHtml?: string;
  bodyHtml?: string;
}

export default function ScriptInjector({ headHtml, bodyHtml }: Props) {
  useEffect(() => {
    if (headHtml?.trim()) {
      const tmp = document.createElement('div');
      tmp.innerHTML = headHtml;
      Array.from(tmp.children).forEach(el => {
        // Re-create script elements so the browser actually executes them
        if (el.tagName === 'SCRIPT') {
          const s = document.createElement('script');
          Array.from(el.attributes).forEach(a => s.setAttribute(a.name, a.value));
          s.textContent = el.textContent;
          document.head.appendChild(s);
        } else {
          document.head.appendChild(el.cloneNode(true));
        }
      });
    }

    if (bodyHtml?.trim()) {
      const tmp = document.createElement('div');
      tmp.innerHTML = bodyHtml;
      Array.from(tmp.children).forEach(el => {
        if (el.tagName === 'SCRIPT') {
          const s = document.createElement('script');
          Array.from(el.attributes).forEach(a => s.setAttribute(a.name, a.value));
          s.textContent = el.textContent;
          document.body.appendChild(s);
        } else {
          document.body.appendChild(el.cloneNode(true));
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
