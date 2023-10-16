import {Component, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FileUpload, uploadFile} from "../../uploadFile";

@Component({
  selector: 'app-file-upload-example',
  templateUrl: './file-upload-example.component.html',
})
export class FileUploadExampleComponent {
  @ViewChild('fileInput') fileInput: ElementRef | null = null;

  fileToUpload: File | null = null
  fileUpload: FileUpload | null = null

  onFileInput(e: Event) {
    const input = (e.target as HTMLInputElement | undefined)
    if ( input && input.files && input.files.length > 0 ) {
      this.fileToUpload = input.files[0]
      this.fileUpload = null
    } else {
      this.fileToUpload = null
    }
  }

  handleFileUpload(e: Event) {
    e.preventDefault()

    if ( this.fileToUpload ) {
      uploadFile(this.fileToUpload)
        .then((result) => {
          this.fileUpload = result
          this.fileToUpload = null

          if ( this.fileInput ) {
            this.fileInput.nativeElement.value = ""
          }
        })
    }
  }
}
