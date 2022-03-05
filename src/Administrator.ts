export default class Administrator {
  private key: string;

  private static instance: Administrator;

  private constructor(key: string) {
    this.key = key;
  }

  public static getInstance(): Administrator {
    if (!Administrator.instance) {
      Administrator.instance = new Administrator('admin-key');
    }
    return Administrator.instance;
  }
}

const admin = Administrator.getInstance();
const admin2 = Administrator.getInstance();

console.log(admin === admin2);
