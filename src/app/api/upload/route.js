import { LANDING_BASE_URL } from "@/app/layout";
import { uploadFile } from "@/utils/uploadFile";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("files[0]");
    const customPath = formData.get("customPath") || null;

    if (!file) {
      return new Response(JSON.stringify({ success: false, error: "Dosya bulunamadı!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const filePath = await uploadFile(file, { customPath });
    const baseFilePath = `${LANDING_BASE_URL}${filePath}`;

    return new Response(
      JSON.stringify({
        success: true,
        files: [baseFilePath]
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Yükleme hatası:", error);
    return new Response(JSON.stringify({ success: false, error: "Yükleme sırasında hata oluştu!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
