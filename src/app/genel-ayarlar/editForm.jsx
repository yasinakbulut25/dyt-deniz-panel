import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";
import { updateUserInfosAction } from "@/store/actionCreators";
import Card from "@/components/card";
import InputField from "@/components/form/InputField";
import SubmitButton from "@/components/form/SubmitButton";
import TextAreaField from "@/components/form/TextAreaField";
import Loading from "@/components/loading";

function EditForm({ editItem }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(SELECTORS.getUserLoading);

  const initialStates = {
    user: editItem.user,
    password: editItem.password,
    contactEmail: editItem.contactEmail,
    whatsappPhone: editItem.whatsappPhone,
    map: editItem.map,
    address: editItem.address,
  };

  const [formData, setFormData] = useState(initialStates);
  const requiredFields = ["user", "password", "whatsappPhone", "address"];
  const isDisabled = requiredFields.some((field) => !formData[field]);

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfosAction({ table: "admin", data: formData }));
  };

  if (!editItem || isLoading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-start my-4"
    >
      <Card extraClass="flex-1 w-full flex gap-4 flex-col min-w-[300px]">
        <InputField
          label="Kullanıcı Adı"
          placeholder="doldurunuz.."
          onChange={handleChange("user")}
          value={formData.user}
        />
        <InputField
          label="Şifre"
          placeholder="doldurunuz.."
          onChange={handleChange("password")}
          value={formData.password}
        />
        <InputField
          label="İletişim E-posta"
          placeholder="doldurunuz.."
          onChange={handleChange("contactEmail")}
          value={formData.contactEmail}
        />
        <InputField
          label="Whatsapp İletişim Telefonu (0 olmadan giriniz)"
          placeholder="doldurunuz.."
          onChange={handleChange("whatsappPhone")}
          value={formData.whatsappPhone}
        />
        <TextAreaField
          label="Adres"
          placeholder="doldurunuz.."
          onChange={handleChange("address")}
          value={formData.address}
        />
        <TextAreaField
          label="İletişim Harita / Konum Kodu"
          placeholder="doldurunuz.."
          onChange={handleChange("map")}
          value={formData.map}
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
