import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import { updateServiceAction } from "@/store/actionCreators";
import Card from "@/components/card";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import { Button } from "@nextui-org/react";
import { CloudUploadIcon } from "@/icons";
import SelectBox from "@/components/select";
import { LANDING_BASE_URL } from "@/app/layout";
import { PLACEHOLDER_IMAGE } from "@/constants";
import Editor from "@/components/editor/page";
import { showToast } from "@/components/toast";
import { uploadFile } from "@/utils/uploadFile";
import TextAreaField from "@/components/form/TextAreaField";
import { convertToUrl } from "@/utils/helpers";

function EditForm({ editItem }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getServicesLoading);
  const currentImage = editItem.image;

  const initialStates = {
    title: editItem.title,
    description: editItem.description,
    content: editItem.content,
    image: editItem.image,
    publish: Number(editItem.publish),
  };

  const [formData, setFormData] = useState(initialStates);
  const [previewImage, setPreviewImage] = useState("");
  const requiredFields = ["title", "description", "content", "image"];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewImage(URL.createObjectURL(image));
      setFormData({ ...formData, image: image });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editDataID = editItem.id;
    let imagePath = currentImage;
    const url = convertToUrl(formData.title);

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
      url: url,
    };

    dispatch(updateServiceAction({ id: editDataID, data }));
  };

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
                alt="yazi"
              />
            ) : (
              <img
                className="w-[140px] h-[140px] object-contain"
                src={`${LANDING_BASE_URL}${
                  formData.image || PLACEHOLDER_IMAGE
                }`}
                alt="hizmet"
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
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <InputField
            type="text"
            label="Hizmet Başlığı"
            placeholder="doldurunuz.."
            onChange={handleChange("title")}
            value={formData.title}
          />
          <SelectBox
            label="Sitede Gözüksün mü?"
            items={[
              {
                id: 1,
                label: "✅ Sitede Gözüksün",
              },
              {
                id: 0,
                label: "❌ Sitede Gözükmesin",
              },
            ]}
            placeholder="Gözüksün / Gözükmesin"
            onChange={handleChange("publish")}
            errorMessage="Lütfen geçerli değer giriniz!"
            defaultSelectedKeys={[formData.publish]}
          />
        </div>
        <TextAreaField
          label="Kısa Açıklama (ana sayfada gösterilen)"
          placeholder="doldurunuz.."
          onChange={handleChange("description")}
          value={formData.description}
        />
        <Editor
          label="Hizmet İçeriği"
          onChange={(value) => setFormData({ ...formData, content: value })}
          content={formData.content}
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
