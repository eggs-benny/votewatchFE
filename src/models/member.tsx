export interface MpData {
  items: Member[];
}

export interface Member {
  value: Value;
  links: Link[];
}

export interface Link {
  rel: string;
  href: string;
  method: string;
}

interface Value {
  id: number;
  nameListAs: string;
  nameDisplayAs: string;
  nameFullTitle: string;
  nameAddressAs: string;
  latestParty: LatestParty;
  gender: string;
  latestHouseMembership: LatestHouseMembership;
  thumbnailUrl: string;
}

export interface LatestHouseMembership {
  membershipFrom: string;
  membershipFromId: number;
  house: number;
  membershipStartDate: Date;
  membershipEndDate: null;
  membershipEndReason: null;
  membershipEndReasonNotes: null;
  membershipEndReasonId: null;
  membershipStatus: MembershipStatus;
}

interface MembershipStatus {
  statusIsActive: boolean;
  statusDescription: string;
  statusNotes: null;
  statusId: number;
  status: number;
  statusStartDate: Date;
}

export interface LatestParty {
  id: number;
  name: string;
  abbreviation: string;
  backgroundColour: string;
  foregroundColour: string;
  isLordsMainParty: boolean;
  isLordsSpiritualParty: boolean;
  governmentType: null;
  isIndependentParty: boolean;
}

export interface ContactInfo {
  value: ContactValue[];
  links: ContactLink[];
}

interface ContactLink {
  rel: string;
  href: string;
  method: string;
}

interface ContactValue {
  type: string;
  typeDescription: string;
  typeId: number;
  isPreferred: boolean;
  isWebAddress: boolean;
  notes: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  line5: string;
  postcode: string;
  phone: string;
  fax: string;
  email: string;
}

export interface TwfyMember {
  member_id: string;
  house: string;
  constituency: string;
  party: string;
  entered_house: Date;
  left_house: Date;
  entered_reason: string;
  left_reason: string;
  person_id: string;
  lastupdate: Date;
  title: string;
  given_name: string;
  family_name: string;
  full_name: string;
  url: string;
  image: string;
  image_height: number;
  image_width: number;
  office: Office[];
}

interface Office {
  moffice_id: string;
  dept: string;
  position: string;
  from_date: Date;
  to_date: Date;
  person: string;
  source: string;
}
