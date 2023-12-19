export const storageUserLoginData = (user) => {
  localStorage.setItem("userDetails", JSON.stringify(user));
};

export const storagePdfData = (pdf) => {
    localStorage.setItem("Details", JSON.stringify(pdf));
  };

export const removeData = () => {
  localStorage.clear();
};

