/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { storage, updateProfile } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImage = async (file: any, currentUser: any) => {
  const fileRef = ref(storage, `images/${file.name}`);

  //const setLoading = true;
  const snapShot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  //setLoading(false);
  toast.success("Image uploaded successfully");
  console.log(snapShot.metadata.fullPath);
};
