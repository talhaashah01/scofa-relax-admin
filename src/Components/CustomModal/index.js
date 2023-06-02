import Swal from "sweetalert2";

export const questionModal = Swal.mixin({
  icon: "question",
  allowOutsideClick: false,
  background: "#013D5F",
  color: "#fff",
  iconColor: "#fff",
  showCloseButton: true,
  customClass: {
    confirmButton: "customButton primaryButton mx-2",
    cancelButton: "customButton secondaryButton mx-2",
  },
  buttonsStyling: false,
  showCancelButton: true,
  denyButtonText: `Cancel`,
});

export const successModal = Swal.mixin({
    title: 'Success',
    icon: "success",
    allowOutsideClick: false,
    background: "#013D5F",
    color: "#fff",
    iconColor: "#fff",
    customClass: {
      confirmButton: "customButton primaryButton mx-2",
    },
    buttonsStyling: false,
    timer: 2000,
  });