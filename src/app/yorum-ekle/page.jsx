"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import { createCommentAction } from "@/store/actionCreators";
import Card from "@/components/card";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import TextAreaField from "@/components/form/TextAreaField";
import { generateUniqueID } from "@/utils/helpers";
import SelectBox from "@/components/select";

function AddComment() {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getCommentsLoading);

  const initialStates = {
    name: "",
    date: "",
    description: "",
    publish: 1,
  };

  const [formData, setFormData] = useState(initialStates);
  const requiredFields = ["name", "date", "description"];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hash = generateUniqueID();
    const data = {
      ...formData,
      hash: hash,
    };

    dispatch(createCommentAction(data));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-start my-4"
    >
      <Card extraClass="flex-1 w-full flex gap-4 flex-col min-w-[300px]">
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <InputField
            type="text"
            label="Kişi"
            placeholder="doldurunuz.."
            onChange={handleChange("name")}
            value={formData.name}
          />
          <InputField
            type="date"
            label="Tarih"
            placeholder="doldurunuz.."
            onChange={handleChange("date")}
            defaultValue={formData.date}
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
          label="Yorum İçeriği"
          placeholder="doldurunuz.."
          onChange={handleChange("description")}
          value={formData.description}
        />
      </Card>
      <div className="flex flex-col gap-4 w-full max-w-[400px] mx-auto">
        <SubmitButton isLoading={isLoading} isDisabled={isDisabled}>
          Ekle
        </SubmitButton>
      </div>
    </form>
  );
}

export default AddComment;
