import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import { updateSectionAction } from "@/store/actionCreators";
import Card from "@/components/card";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import SelectBox from "@/components/select";
import TextAreaField from "@/components/form/TextAreaField";

function EditForm({ section }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getSectionsLoading);

  const initialStates = {
    sectionTitle: section.sectionTitle,
    sectionSubtitle: section.sectionSubtitle,
    sectionDescription: section.sectionDescription,
    publish: Number(section.publish),
  };

  const [formData, setFormData] = useState(initialStates);
  const requiredFields = [
    "sectionTitle",
    "sectionSubtitle",
    "sectionDescription",
    "publish",
  ];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sectionID = section.id;
    const data = {
      ...formData,
    };

    dispatch(updateSectionAction({ id: sectionID, data }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-start my-4"
    >
      <Card extraClass="flex-1 w-full flex gap-4 flex-col min-w-[300px]">
        <div className="grid lg:grid-cols-3 gap-x-4 gap-y-2">
          <InputField
            type="text"
            label="Başlık"
            placeholder="doldurunuz.."
            onChange={handleChange("sectionTitle")}
            value={formData.sectionTitle}
          />
          <InputField
            type="text"
            label="Mini Başlık"
            placeholder="doldurunuz.."
            onChange={handleChange("sectionSubtitle")}
            value={formData.sectionSubtitle}
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
          label="Açıklama"
          placeholder="doldurunuz.."
          onChange={handleChange("sectionDescription")}
          value={formData.sectionDescription}
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
