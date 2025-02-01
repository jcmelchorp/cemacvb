export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    
    // all field above (AND MANY MORE) are alrady provided by firebase
    // let's add some new
  
    // platformId: string;
    // lang: string;
    // ... and more and more
  }