export default class User {
  constructor(id, name, email, website, phone) {
    console.log('User rendered');
    this.id = id;
    this.name = name;
    this.email = email;
    this.website = website;
    this.phone = phone;
  }

  hasComWebsite() {
    return true;
    // if(this.website.indexOf('.com') !== -1) return true;
    // return false;
  }
}
