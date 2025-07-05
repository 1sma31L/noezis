/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiImageEditLine,
} from "react-icons/ri";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { UserWithProfile } from "@/lib/types/user";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ANONYMOUS_BANNER_IMAGE, ANONYMOUS_PROFILE_IMAGE } from "@/constants";
import { api } from "@/trpc/react";
import { updateProfileSchema } from "@/lib/schemas/user";
import { useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "@/helpers/appwrite";
import { BUCKET_IDS } from "@/lib/clients/appwrite-client";
import { toast } from "sonner";

type updateProfileSchema = z.infer<typeof updateProfileSchema>;

function EditProfileDialog({ profile }: { profile: UserWithProfile }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: updateProfile, isPending } =
    api.user.updateProfile.useMutation({
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [["user", "getProfileByUsername"]],
          }),
          queryClient.invalidateQueries({
            queryKey: [["user", "getProfileByUserId"]],
          }),
        ]);

        toast.success("Profile updated successfully");
        onClose();
      },
      onError: (error) => {
        toast.error(error.message ?? "Failed to update profile");
      },
    });

  const form = useForm<updateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    values: {
      name: profile.user.name,
      bio: profile.bio ?? "",
      location: profile.location ?? "",
      website: profile.website ?? "",
      bannerImage: profile.bannerImage ?? "",
      image: profile.user.image ?? "",
    },
  });

  const onSubmit = async (data: updateProfileSchema) => {
    try {
      await updateProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    form.reset({
      name: profile.user.name,
      bio: profile.bio ?? "",
      location: profile.location ?? "",
      website: profile.website ?? "",
      bannerImage: profile.bannerImage ?? "",
      image: profile.user.image ?? "",
    });
    setDrawerOpen(false);
    setDialogOpen(false);
  };

  const ProfileForm = ({ onClose }: { onClose: () => void }) => (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 md:gap-4"
      >
        {/* BANNER and PROFILE IMAGE */}
        <div className="aspect-banner relative flex flex-col gap-2 pb-10">
          <div className="group relative overflow-hidden rounded-lg">
            <img
              src={form.watch("bannerImage") ?? ANONYMOUS_BANNER_IMAGE}
              alt="Banner"
              className={`h-30 w-full rounded-lg object-cover transition-all duration-300 ${
                editMode ? "blur-xs" : "lg:group-hover:blur-xs"
              }`}
            />

            <div
              className={`bg-accent/20 absolute inset-0 items-center justify-center transition-opacity duration-300 ${
                editMode ? "flex lg:hidden" : "hidden lg:group-hover:flex"
              }`}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className=""
                onClick={async () => {
                  try {
                    // open file picker
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = async () => {
                      const file = input.files?.[0];
                      if (file) {
                        const toastId = toast.loading(
                          "Uploading banner image...",
                        );

                        try {
                          // Upload to Appwrite
                          const imageUrl = await uploadImage(
                            file,
                            BUCKET_IDS.BANNER_PICTURES,
                          );
                          // Update form
                          form.setValue("bannerImage", imageUrl);
                          toast.dismiss(toastId);
                          toast.success("Banner image uploaded successfully");
                        } catch (error) {
                          toast.dismiss(toastId);
                          toast.error("Failed to upload banner image");
                          console.error(error);
                        }
                      }
                    };
                    input.click();
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <RiImageEditLine className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  form.setValue("bannerImage", ANONYMOUS_BANNER_IMAGE)
                }
              >
                <RiDeleteBinLine className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="ring-background group absolute top-16 left-2 overflow-hidden rounded-full ring-2">
            <img
              src={form.watch("image") ?? ANONYMOUS_PROFILE_IMAGE}
              alt="Profile"
              className={`ring-primary h-22 w-22 rounded-full object-cover ring-1 transition-all duration-300 ${
                editMode ? "blur-xs" : "lg:group-hover:blur-xs"
              }`}
            />
            <div
              className={`bg-accent/20 absolute inset-0 items-center justify-center transition-opacity duration-300 ${
                editMode ? "flex lg:hidden" : "hidden lg:group-hover:flex"
              }`}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={async () => {
                  try {
                    // open file picker
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = async () => {
                      const file = input.files?.[0];
                      if (file) {
                        const toastId = toast.loading(
                          "Uploading profile image...",
                        );

                        try {
                          // Upload to Appwrite
                          const imageUrl = await uploadImage(
                            file,
                            BUCKET_IDS.PROFILE_PICTURES,
                          );
                          // Update form
                          form.setValue("image", imageUrl);
                          toast.dismiss(toastId);
                          toast.success("Profile image uploaded successfully");
                        } catch (error) {
                          toast.dismiss(toastId);
                          toast.error("Failed to upload profile image");
                          console.error(error);
                        }
                      }
                    };
                    input.click();
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                <RiImageEditLine className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => form.setValue("image", ANONYMOUS_PROFILE_IMAGE)}
              >
                <RiDeleteBinLine className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        {/* SHOW EDIT BUTTONS IN MOBILE */}
        <div className="flex w-full flex-row items-center justify-start gap-2 py-2 lg:hidden">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="!text-xs"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Preview" : "Edit pictures"}
            {editMode ? (
              <RiEyeLine className="h-4 w-4" />
            ) : (
              <RiEditLine className="h-4 w-4" />
            )}
          </Button>
        </div>
        {/* NAME */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-xs">Name</FormLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                className="h-8 text-sm"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* BIO */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-xs">Bio</FormLabel>
              <Textarea
                {...field}
                value={field.value ?? ""}
                className="h-10 text-sm lg:h-20"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* LOCATION */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-xs">Location</FormLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                className="h-8 text-sm"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* WEBSITE */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-xs">Website</FormLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                className="h-8 text-sm"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center justify-end gap-2 py-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <>
      {/* DESKTOP DIALOG */}
      <div className="hidden lg:block">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="!md:text-sm text-muted-foreground !bg-primary/10 rounded-full !text-xs"
              size={"sm"}
            >
              Edit Profile
              <RiEditLine className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="sr-only">Edit Profile</DialogTitle>
            </DialogHeader>
            <ProfileForm onClose={onClose} />
          </DialogContent>
        </Dialog>
      </div>

      {/* MOBILE DRAWER */}
      <div className="block lg:hidden">
        <Drawer repositionInputs open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              size={"icon"}
              variant="outline"
              className="!md:text-sm text-muted-foreground !bg-primary/10 rounded-full !text-xs"
            >
              <RiEditLine className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto flex w-full max-w-md flex-1 flex-col overflow-auto">
              <DrawerHeader className="pb-2">
                <DrawerTitle className="sr-only">Edit Profile</DrawerTitle>
              </DrawerHeader>
              <div className="px-4">
                <ProfileForm onClose={onClose} />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

export default EditProfileDialog;
