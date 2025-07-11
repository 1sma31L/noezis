"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  type Editor,
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
import { useEffect, useState } from "react";
import { env } from "@/env";

const EDITOR_LIMIT = 100000;

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
  const { setPost, post } = usePost();
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    onUpdate: ({ editor }: { editor: Editor }) => {
      if (!post) {
        return;
      }
      setPost({ ...post, content: editor.getJSON() as JSON });
    },

    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: EDITOR_LIMIT,
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
          "prose dark:prose-invert md:prose-lg max-w-none w-full bg-background focus:outline-none",
      },
    },
    immediatelyRender: false,
  }) as EditorWithCharCount | null;

  useEffect(() => {
    setIsMounted(true);
    if (post) {
      editor?.commands.setContent(post.content);
    } else {
      editor?.commands.setContent("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!editor || !isMounted) {
    return <div className="bg-muted h-40 w-full animate-pulse rounded-md" />;
  }

  const percentage = editor
    ? Math.round(
        (100 / EDITOR_LIMIT) * editor.storage.characterCount.characters(),
      )
    : 0;

  return (
    <div className="w-full">
      <EditorBubbleMenu editor={editor} />
      <EditorContent editor={editor} />
      <div
        className={`text-muted-foreground flex flex-col items-center gap-3 pt-16 text-sm ${
          editor.storage.characterCount.characters() === EDITOR_LIMIT
            ? "text-destructive"
            : ""
        }`}
      >
        <div className="relative flex min-w-[120px] flex-col gap-0.5 self-end">
          <div className="absolute top-2 -left-8 h-5 w-5">
            <svg
              height="20"
              width="20"
              viewBox="0 0 20 20"
              className="rotate-[-90deg]"
            >
              <circle
                r="8"
                cx="10"
                cy="10"
                className="fill-muted stroke-none"
              />
              <circle
                r="8"
                cx="10"
                cy="10"
                fill="transparent"
                className={`stroke-current transition-all ${
                  percentage > 90 ? "stroke-destructive" : "stroke-primary"
                }`}
                strokeWidth="2"
                strokeDasharray={`calc(${percentage} * 50.24 / 100) 50.24`}
                transform="rotate(0) translate(0)"
              />
            </svg>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span>Characters: </span>
            <span className="font-medium">
              {editor.storage.characterCount.characters()}/{EDITOR_LIMIT}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Words</span>
            <span className="font-medium">
              {editor.storage.characterCount.words()}
            </span>
          </div>
        </div>
      </div>
      {env.NEXT_PUBLIC_APP_ENV === "development" && (
        <pre className="max-w-auto overflow-auto py-10">
          {JSON.stringify(post, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default Tiptap;
