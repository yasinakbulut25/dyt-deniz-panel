import React, { useRef, useCallback } from "react";
import JoditEditor from "jodit-react";

function Editor({ label, onChange, content = "" }) {
  const editorInstance = useRef(null);

  const handleBlur = useCallback(
    (newContent) => {
      if (onChange && typeof onChange === "function") {
        onChange(newContent);
      }
    },
    [onChange]
  );

  const config = {
    uploader: {
      insertImageAsBase64URI: false,
      url: "/api/upload",
      process: (response) => {
        let files = [];
        response.files.forEach((file) => {
          if (editorInstance.current) {
            editorInstance.current.selection.insertImage(file);
          }
          files.push(file);
        });
        return {
          files,
          path: "",
          baseurl: "",
          error: response.success ? 0 : 1,
          msg: response.message,
        };
      },
    },
    language: "tr",
    enter: "BR",
    defaultMode: "1",
    minHeight: 400,
    inline: false,
    toolbarInlineForSelection: true,
    showPlaceholder: false,
    buttons:
      "bold,italic,underline,strikethrough,ul,ol,font,brush,fontsize,paragraph,lineHeight,superscript,subscript,image,video,symbols,preview,spellcheck,speechRecognize,cut,copy,paste",
    events: {
      afterInit: (editor) => {
        editorInstance.current = editor;
      },
    },
  };

  return (
    <>
      <span className="text-sm text-navy-700 dark:text-dark-50 font-medium text-left !ps-0 !pe-0">
        {label}
      </span>
      <JoditEditor
        ref={editorInstance}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={handleBlur}
      />
    </>
  );
}

export default Editor;
