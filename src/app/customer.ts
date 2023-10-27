export class customer {
  customer_number: number;
  first_name: string;
  last_name: string;
  date_birth: Date;
  ssn: string;
  email: string;
  primary_address: PrimaryAddress;
  mobile_phone_number: string;
  join_date: string;



  constructor(

    customer_number: number,
    first_name: string,
    last_name: string,
    date_birth: Date,
    ssn: string,
    email: string,
    primary_address: PrimaryAddress,
    mobile_phone_number: string,
    join_date: string) {

    this.customer_number = customer_number
    this.first_name = first_name;
    this.last_name = last_name;
    this.date_birth = date_birth;
    this.ssn = ssn;
    this.email = email;
    this.primary_address = primary_address;
    this.mobile_phone_number = mobile_phone_number;
    this.join_date = join_date;



    { }



  }
}

export class PrimaryAddress {
  address_line_1: string;
    zip_code: any;
    state: string;
    city: string;

  constructor(
    address_line_1: string,
    city: string,
    state: string,
    zip_code: number) {

    this.address_line_1 = address_line_1;
    this.city = city;
    this.state = state;
    this.zip_code = zip_code;


  }


}
