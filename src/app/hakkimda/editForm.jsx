"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import { updateUserInfosAction } from "@/store/actionCreators";
import Card from "@/components/card";
import SubmitButton from "@/components/form/SubmitButton";
import Loading from "@/components/loading";
import { Button } from "@nextui-org/react";
import { uploadFile } from "@/utils/uploadFile";
import { showToast } from "@/components/toast";
import { CloudUploadIcon } from "@/icons";
import { PLACEHOLDER_IMAGE } from "@/constants";
import { LANDING_BASE_URL } from "../layout";
import Editor from "@/components/editor/page";

function EditForm({ editItem }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getUserLoading);
  const currentImage = editItem.image;

  const initialStates = {
    content: editItem.content,
    content_long: editItem.content_long,
    image: editItem.image,
  };

  const [formData, setFormData] = useState(initialStates);
  const [previewImage, setPreviewImage] = useState("");
  const requiredFields = ["content", "content_long", "image"];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewImage(URL.createObjectURL(image));
      setFormData({ ...formData, image: image });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imagePath = currentImage;

    if (formData.image !== "" && formData.image !== currentImage) {
      try {
        imagePath = await uploadFile(formData.image);
      } catch (error) {
        showToast("error", error.message);
        return;
      }
    }

    const data = {
      ...formData,
      image: imagePath,
    };

    dispatch(updateUserInfosAction({ table: "about", data }));
  };

  if (!editItem || isLoading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-start my-4"
      encType="multipart/form-data"
    >
      <Card extraClass="flex-1 w-full flex gap-4 flex-col min-w-[300px]">
        <div className="max-w-[700px] grid sm:grid-cols-2 gap-4">
          <div className="min-w-[152px] overflow-hidden">
            {previewImage !== "" ? (
              <img
                className="w-[140px] h-[140px] object-contain"
                src={previewImage}
                alt="hakkımda"
              />
            ) : (
              <img
                className="w-[140px] h-[140px] object-contain"
                src={`${LANDING_BASE_URL}${
                  formData.image || PLACEHOLDER_IMAGE
                }`}
                alt="hakkımda"
              />
            )}
            {formData.image !== "" && (
              <Button
                className="mt-2"
                size="sm"
                onClick={() => {
                  setFormData({ ...formData, image: "" });
                  setPreviewImage(PLACEHOLDER_IMAGE);
                }}
              >
                Resmi Kaldır
              </Button>
            )}
          </div>
          <div className="min-w-[200px] flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-dark-400 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800/50"
            >
              <div className="flex flex-col items-center justify-center py-8 px-2 gap-2">
                <CloudUploadIcon className="text-gray-500 dark:text-gray-400 w-8" />
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Yüklemek için tıklayın
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
              />
            </label>
          </div>
        </div>
        <Editor
          label="Hakkımda Açıklaması (Ana Sayfa)"
          onChange={(value) => setFormData({ ...formData, content: value })}
          content={formData.content}
        />
        <Editor
          label="Hakkımda Açıklaması (Detay Sayfası)"
          onChange={(value) => setFormData({ ...formData, content_long: value })}
          content={formData.content_long}
        />
      </Card>
      <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto">
        <SubmitButton isLoading={isLoading} isDisabled={isDisabled}>
          Düzenlemeyi Kaydet
        </SubmitButton>
      </div>
    </form>
  );
}

export default EditForm;
