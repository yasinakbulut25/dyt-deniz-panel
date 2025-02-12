"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import { createQuestionAction } from "@/store/actionCreators";
import Card from "@/components/card";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import TextAreaField from "@/components/form/TextAreaField";
import { generateUniqueID } from "@/utils/helpers";
import Editor from "@/components/editor/page";

function AddQuestion() {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getQuestionsLoading);

  const initialStates = {
    question: "",
    answer: "",
  };

  const [formData, setFormData] = useState(initialStates);
  const requiredFields = ["question", "answer"];
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

    dispatch(createQuestionAction(data));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-start my-4"
    >
      <Card extraClass="flex-1 w-full flex gap-4 flex-col min-w-[300px]">
        <InputField
          type="text"
          label="Soru"
          placeholder="doldurunuz.."
          onChange={handleChange("question")}
          value={formData.question}
        />
        <Editor
          label="Cevap"
          onChange={(value) => setFormData({ ...formData, answer: value })}
          content={formData.answer}
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

export default AddQuestion;
