import { HttpErrorResponse } from '@angular/common/http';

export const rootURL = 'http://localhost:3000/';

// error handling function
export const errorHandling = (error, navigate, showMessage?) => {
  if(error instanceof HttpErrorResponse ) {
    if (error.status === 401) {
      navigate
    }
    if (error.status === 400 || error.status === 500){
      showMessage
    }
  }
}


