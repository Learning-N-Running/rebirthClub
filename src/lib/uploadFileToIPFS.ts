const uploadFileToIPFS = async (imageUrl: string) => {
  try {
    const imageBlob = await (await fetch(imageUrl)).blob();
    const file = new File([imageBlob], "image.jpg", { type: imageBlob.type });

    // FileReader 작업을 Promise로 감싸기
    const getBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    // Blob을 Base64로 인코딩
    const base64String = (await getBase64(file)) as string;
    const content = base64String.replace("data:", "").replace(/^.+,/, "");

    const data = {
      filename: file.name,
      contentType: file.type,
      content: content,
    };

    // 서버에 업로드
    const res = await fetch("/api/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const ipfsHash = (await res.json()).ipfsHash;
    return ipfsHash; // IPFS 해시 반환
  } catch (e) {
    console.error(e);
    alert("Trouble uploading file");
    return null; // 오류 발생 시 null 반환
  }
};

export default uploadFileToIPFS;
