import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import { updateQuestionAction } from "@/store/actionCreators";
import Card from "@/components/card";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import Editor from "@/components/editor/page";

function EditForm({ editItem }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getQuestionsLoading);

  const initialStates = {
    question: editItem.question,
    answer: editItem.answer,
  };

  const [formData, setFormData] = useState(initialStates);
  const requiredFields = ["question", "answer"];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editDataID = editItem.id;
    const data = {
      ...formData,
    };

    dispatch(updateQuestionAction({ id: editDataID, data }));
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
          Düzenlemeyi Kaydet
        </SubmitButton>
      </div>
    </form>
  );
}

export default EditForm;
