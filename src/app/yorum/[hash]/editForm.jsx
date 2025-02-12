import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import { updateCommentAction } from "@/store/actionCreators";
import Card from "@/components/card";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import SelectBox from "@/components/select";
import TextAreaField from "@/components/form/TextAreaField";

function EditForm({ editItem }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getCommentsLoading);

  const initialStates = {
    name: editItem.name,
    date: editItem.date,
    description: editItem.description,
    publish: Number(editItem.publish),
  };

  const [formData, setFormData] = useState(initialStates);
  const requiredFields = ["name", "date", "description"];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editDataID = editItem.id;

    const data = {
      ...formData,
    };

    dispatch(updateCommentAction({ id: editDataID, data }));
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
          Düzenlemeyi Kaydet
        </SubmitButton>
      </div>
    </form>
  );
}

export default EditForm;
