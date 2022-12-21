import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    if (event.target.name === "imageUrl") {
      const reader = new FileReader();
      // reader.addEventListener("load", () => () => {
      //   console.log(reader.result);
      //   setValues({ ...values, [event.target.name]: reader.result });
      // });

      reader.onload = () => {
        setValues({ ...values, imageUrl: reader.result });
      };

      reader.addEventListener("error", () => {
        alert("Couldn't load the file");
      });

      reader.readAsDataURL(event.target.files[0]);
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
