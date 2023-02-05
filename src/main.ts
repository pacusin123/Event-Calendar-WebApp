import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {registerLicense} from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
registerLicense('Mgo+DSMBaFt/QHRqVVhkVFpHaVldX2NLfUN+T2ZcdVxxZDU7a15RRnVfQF1nS39Td0djWHZbcA==;Mgo+DSMBPh8sVXJ0S0J+XE9AflRBQmVWfFN0RnNRdVt1fldHcDwsT3RfQF5jS35XdERjWH1ecnRdRg==;ORg4AjUWIQA/Gnt2VVhkQlFacldJXnxPYVF2R2BJd1R1cV9EYUwxOX1dQl9gSXxTckdiWX5ccHZXR2A=;MTA2NjUyNkAzMjMwMmUzNDJlMzBpNWhLbDZWSUQxbFhPNlUzMHF2aytTdzNaa3NUVkc4MG1jNHRTQ0Y3RjdzPQ==;MTA2NjUyN0AzMjMwMmUzNDJlMzBOTHZUWDVNd2JOUWdXQjlKL2Z5UlZjczBzUk9GaWN4ejJNTzM3V2UvUDRBPQ==;NRAiBiAaIQQuGjN/V0Z+WE9EaFtKVmBWeEx0RWFab1Z6cVBMYl1BJAtUQF1hSn5RdkFhWH9fcnRXT2RZ;MTA2NjUyOUAzMjMwMmUzNDJlMzBOWEhMdDYzWURXUkdUa2h5MlV6V1JYcWZEaTRlSUEyNlNYenRRem1DSThBPQ==;MTA2NjUzMEAzMjMwMmUzNDJlMzBTNUxNWFQ2S25PYlJMSTZPc2YxTHJBU212aHdSQ05lc3BOUlpoV0QrSmdJPQ==;Mgo+DSMBMAY9C3t2VVhkQlFacldJXnxPYVF2R2BJd1R1cV9EYUwxOX1dQl9gSXxTckdiWX5ccHdQRmU=;MTA2NjUzMkAzMjMwMmUzNDJlMzBHK1lJVHR3Y29oQ3cxaEtqT1duYzZZS2RVSDlRc0pESFNwNFU0ak9OQk9ZPQ==;MTA2NjUzM0AzMjMwMmUzNDJlMzBZWjFvajJlcjg0b2htY3VQWC9Yai9DOWhIWUF5WEFjTXZPSkdGTFhUWjNvPQ==;MTA2NjUzNEAzMjMwMmUzNDJlMzBOWEhMdDYzWURXUkdUa2h5MlV6V1JYcWZEaTRlSUEyNlNYenRRem1DSThBPQ==')
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
