import React from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

interface EditorProps {
  onChange: (blocks: OutputData['blocks']) => void;
  ininialBlocks?: OutputData['blocks'];
}

export const Editor: React.FC<EditorProps> = ({
  onChange,
  ininialBlocks = [],
}) => {
  React.useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      data: { blocks: ininialBlocks },
      placeholder: 'Enter manga description',
      async onChange() {
        const { blocks } = await editor.save();
        onChange(blocks);
      },
    });

    return () => {
      editor.isReady.then(() => {
        editor.destroy();
      });
    };
  }, []);
  return <div id='editor' />;
};
