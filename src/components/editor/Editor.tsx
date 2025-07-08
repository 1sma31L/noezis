"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  type Editor,
  generateHTML,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import {
  RiItalic,
  RiStrikethrough,
  RiBold,
  RiCodeLine,
  RiUnderline,
} from "react-icons/ri";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { Toggle } from "@/components/ui/toggle";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { usePost } from "@/lib/hooks/usePost";
import { useProfile } from "@/lib/hooks/useProfile";
import { useEffect } from "react";

interface EditorWithCharCount extends Editor {
  storage: {
    characterCount: {
      characters: () => number;
      words: () => number;
    };
  };
}

const EditorBubbleMenu = ({ editor }: { editor: Editor }) => {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100, delay: 100 }}>
      <div className="bg-background flex items-center gap-1 rounded-lg border p-1 shadow-md">
        <Toggle
          onClick={() => editor?.chain().focus().toggleBold().run()}
          pressed={editor?.isActive("bold")}
          size={"sm"}
        >
          <RiBold />
        </Toggle>
        <Toggle
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          pressed={editor?.isActive("italic")}
          size={"sm"}
        >
          <RiItalic />
        </Toggle>
        <Toggle
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          pressed={editor?.isActive("strike")}
          size={"sm"}
        >
          <RiStrikethrough />
        </Toggle>
        <Toggle
          onClick={() => editor?.chain().focus().toggleCode().run()}
          pressed={editor?.isActive("code")}
          size={"sm"}
        >
          <RiCodeLine />
        </Toggle>
        <Toggle
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          pressed={editor?.isActive("underline")}
          size={"sm"}
        >
          <RiUnderline />
        </Toggle>
        {/*LInk  */}
      </div>
    </BubbleMenu>
  );
};

const Tiptap = () => {
  const { profile } = useProfile();
  const { setPost, post } = usePost();

  const editor = useEditor({
    onUpdate: ({ editor }: { editor: Editor }) => {
      if (!post) {
        setPost({
          title: "",
          content: editor.getJSON() as JSON,
        });
        return;
      }
      setPost({
        ...post,
        content: editor.getJSON() as JSON,
      });
    },

    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Link.configure({
        HTMLAttributes: {
          target: "_blank",
          class: "text-primary hover:underline cursor-pointer",
        },
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme,
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [""];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      Underline,
      Typography,

      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert md:prose-lg max-w-none  w-full  bg-background focus:outline-none",
      },
    },
    immediatelyRender: false,
  }) as EditorWithCharCount | null;
  useEffect(() => {
    if (post) {
      editor?.commands.setContent(post.content as JSON);
    } else {
      editor?.commands.setContent("");
    }
  }, [post, editor]);
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} />

      <pre className="max-w-auto overflow-auto py-10">
        {JSON.stringify(post, null, 2)}
      </pre>
    </div>
  );
};

export default Tiptap;
