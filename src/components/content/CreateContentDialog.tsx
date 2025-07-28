"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { splitTags } from "@/lib/helpers/strings/splitTags";

// Define the content types
const contentTypes = {
  quickTake: "Quick Take",
  question: "Ask a Question",
  // answer: "Share an Answer",
} as const;

type ContentType = keyof typeof contentTypes;

// Schema for the form
const createContentSchema = z.object({
  type: z.enum(["quickTake", "question", "answer"] as const),
  title: z.string().max(100).optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
});

type CreateContentSchema = z.infer<typeof createContentSchema>;

interface ContentDialogProps {
  trigger: React.ReactNode;
  defaultType?: ContentType;
}

function CreateContentDialog({
  trigger,
  defaultType = "quickTake",
}: ContentDialogProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contentType, setContentType] = useState<ContentType>(defaultType);

  const form = useForm<CreateContentSchema>({
    resolver: zodResolver(createContentSchema),
    defaultValues: {
      type: defaultType,
      title: "",
      content: "",
      tags: "",
    },
  });

  const { mutate: createQuickTake, isPending } =
    api.content.createQuickTake.useMutation({
      onSuccess: () => {
        toast.success("Quick Take created successfully!");
      },
      onError: () => {
        toast.error("Failed to create Quick Take");
      },
    });
  const handleCreateQuickTake = async (data: CreateContentSchema) => {
    createQuickTake({
      content: data.content,
      tags: data.tags ? splitTags(data.tags) : [],
    });
  };
  const onSubmit = async (data: CreateContentSchema) => {
    switch (data.type) {
      case "quickTake":
        handleCreateQuickTake(data);
        break;
      case "question":
        break;
      case "answer":
        break;
      default:
        toast.error("Invalid content type");
    }
    onClose();
  };

  const onClose = () => {
    console.log("Form reset");
    form.reset();
    setDrawerOpen(false);
    setDialogOpen(false);
  };

  const ContentForm = () => (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Type</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value: ContentType) => {
                  field.onChange(value);
                  setContentType(value);
                }}
              >
                <SelectTrigger className="text-xs sm:text-sm">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(contentTypes).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {contentType === "question" && (
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <Input
                  {...field}
                  placeholder="What would you like to ask?"
                  className="text-xs sm:text-sm"
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {contentType === "quickTake"
                  ? "Your Take"
                  : contentType === "question"
                    ? "Additional Details"
                    : "Your Answer"}
              </FormLabel>
              <Textarea
                {...field}
                className="min-h-[150px] text-xs sm:text-sm"
                placeholder={
                  contentType === "quickTake"
                    ? "Share your thoughts..."
                    : contentType === "question"
                      ? "Provide more context about your question..."
                      : "Write your answer..."
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (optional)</FormLabel>
              <Input
                {...field}
                placeholder="Add tags separated by commas"
                className="text-xs sm:text-sm"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center justify-end gap-2 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="!text-xs sm:!text-sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="!text-xs sm:!text-sm"
            disabled={isPending}
          >
            {isPending
              ? "Submitting..."
              : contentType === "quickTake"
                ? "Share Take"
                : contentType === "question"
                  ? "Ask Question"
                  : "Post Answer"}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <>
      {/* Desktop Dialog */}
      <div className="hidden lg:block">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {contentType === "quickTake"
                  ? "Share a Quick Take"
                  : contentType === "question"
                    ? "Ask a Question"
                    : "Share Your Answer"}
              </DialogTitle>
            </DialogHeader>
            <ContentForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile Drawer */}
      <div className="block lg:hidden">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader>
                <DrawerTitle>
                  {contentType === "quickTake"
                    ? "Share a Quick Take"
                    : contentType === "question"
                      ? "Ask a Question"
                      : "Share Your Answer"}
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <ContentForm />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default CreateContentDialog;
