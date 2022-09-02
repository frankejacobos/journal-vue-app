import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";
// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: "dzl4f0sb7",
//   api_key: "631792714974471",
//   api_secret: "omdWiZadLyy4Gq0oSw2WqpIIKKk",
// });

describe("Pruebas en uploadImage", () => {
  test("debe de cargar un archivo y retornar el URL", async (/*done*/) => {
    const { data } = await axios.get(
      "https://res.cloudinary.com/dzl4f0sb7/image/upload/v1662135683/cld-sample-2.jpg",
      { responseType: "arraybuffer" }
    );
    const file = new File([data], "foto.jpg");
    const url = await uploadImage(file);
    expect(typeof url).toBe("string");
    // Borrar imagen por ID
    // const segments = url.split("/");
    // const imageId = segments[segments.length - 1].replace(".jpg", "");
    // cloudinary.v2.api.delete_resources(imageId, {}, () => {
    //   done();
    // });
  });
});
