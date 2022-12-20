import swal from "sweetalert";
import { Confirmation } from "./types";

export class Notify {
  static success(message: string, title: string = "Good job!") {
    swal(title, message, "success");
  }

  static error(message: string, title: string = "Something went wrong") {
    swal(title, message, "error");
  }

  static info(message: string, title: string) {
    swal(title, message, 'info')
  }

  static confirm(args: Confirmation) {
    swal({
      title: args.title || 'Are you sure?',
      text: args.message,
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        args.callback();
      }
    });
  }
}
