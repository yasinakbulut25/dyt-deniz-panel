import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import { updateContactAction } from "@/store/actionCreators";
import Card from "@/components/card";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";

function EditForm({ editItem }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getContactsLoading);

  const initialStates = {
    title: editItem.title,
    link: editItem.link,
  };

  const [formData, setFormData] = useState(initialStates);
  const requiredFields = ["title", "link"];
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

    dispatch(updateContactAction({ id: editDataID, data }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-start my-4"
    >
      <Card extraClass="flex-1 w-full flex gap-4 flex-col min-w-[300px]">
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            type="text"
            label="İletişim"
            placeholder="doldurunuz.."
            onChange={handleChange("title")}
            value={formData.title}
          />
          <InputField
            type="text"
            label="Link"
            placeholder="doldurunuz.."
            onChange={handleChange("link")}
            value={formData.link}
          />
        </div>
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
