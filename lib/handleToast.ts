import { toast } from "sonner";

export const successToast = (
  data: any,
  defaultMsg: string = "Operation Success",
) => {
  toast.success(data?.message ?? defaultMsg, {
    action: {
      label: "X",
      onClick: () => console.log(""),
    },
  });
};

export const errorToast = (error: any, defaultMsg: string) => {
  let toastMsg = defaultMsg;
  const responseMsg = error?.response?.data?.message?.message;
  if (Array.isArray(responseMsg)) {
    toastMsg = responseMsg[0][0].toUpperCase() + responseMsg[0]?.slice(1);
  } else if (responseMsg) {
    toastMsg = responseMsg;
  }
  toast.error(toastMsg, {
    action: {
      label: "X",
      onClick: () => console.log(""),
    },
  });
};
