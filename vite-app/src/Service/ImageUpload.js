import axios from "axios";

const uploadImage = async(file) => {
    let data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "products");
        data.append("cloud_name", "dcnvxy9nd");

        let result = await axios.post('https://api.cloudinary.com/v1_1/dcnvxy9nd/image/upload', data)
        // console.log(result);
        return result.data.url;
}

export default uploadImage;