export interface Division {
  MemberId: number;
  MemberVotedAye: boolean;
  MemberWasTeller: boolean;
  PublishedDivision: PublishedDivision;
}

export interface PublishedDivision {
  DivisionId: number;
  Date: Date;
  PublicationUpdated: Date;
  Number: number;
  IsDeferred: boolean;
  EVELType: string;
  EVELCountry: string;
  Title: string;
  AyeCount: number;
  NoCount: number;
  DoubleMajorityAyeCount: number;
  DoubleMajorityNoCount: number;
  AyeTellers: AyeTeller[];
  NoTellers: AyeTeller[];
  Ayes: AyeTeller[];
  Noes: AyeTeller[];
  FriendlyDescription: string;
  FriendlyTitle: string;
  NoVoteRecorded: AyeTeller[];
  RemoteVotingStart: Date;
  RemoteVotingEnd: Date;
}

export interface AyeTeller {
  MemberId: number;
  Name: string;
  Party: string;
  SubParty: string;
  PartyColour: string;
  PartyAbbreviation: string;
  MemberFrom: string;
  ListAs: string;
  ProxyName: string;
}
