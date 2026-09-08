export type CustomerProfile = {
  id: string;
  email: string;
  name?: string;
};

export type CustomerSession = {
  accessToken: string;
  expiresAt?: string;
  customer?: CustomerProfile;
};

export type Address = {
  id: string;
  label?: string;
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode: string;
  country: string;
};
