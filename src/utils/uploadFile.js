import { LANDING_BASE_URL } from "@/app/layout";
import { generateUniqueID } from "./helpers";

export async function uploadFile(file,
  {
    maxSizeInBytes = 2 * 1024 * 1024,
    allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"],
    isRequired = false,
    customPath = null
  } = {}
) {
  if (!file && isRequired) {
    throw new Error("Dosya seçilmedi.");
  }

  // Dosya formatı kontrolü
  if (!allowedFormats.includes(file.type)) {
    throw new Error(`Desteklenmeyen dosya formatı! Sadece şu formatlar destekleniyor: ${allowedFormats.join(", ")}`);
  }

  // Dosya boyutu kontrolü
  if (file.size > maxSizeInBytes) {
    throw new Error(`Dosya boyutu ${maxSizeInBytes / (1024 * 1024)}MB'yi aşmamalıdır!`);
  }

  const uniqueId = generateUniqueID();
  const firstFourCharacters = uniqueId.substring(0, 4); // İlk 4 karakter
  const newFileName = `${firstFourCharacters}_${file.name}`;

  // FormData ile dosyayı hazırla
  const formData = new FormData();
  formData.append("file", file, newFileName);

  if (customPath) {
    formData.append("customPath", customPath);
  }

  try {
    const response = await fetch(`${LANDING_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
      mode: "cors",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Yükleme başarısız oldu.");
    }

    return result.filePath; // Yüklenen dosya yolu
  } catch (error) {
    console.error("Dosya yükleme hatası:", error);
    throw new Error("Dosya yükleme sırasında hata oluştu.");
  }
}
