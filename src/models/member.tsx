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

export interface Value {
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

export interface MembershipStatus {
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
