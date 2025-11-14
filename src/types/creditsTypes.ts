// src/types/creditsTypes.ts

export interface CastMember {
  cast_id?: number;
  character?: string;
  credit_id?: string;
  id: number;
  name: string;
  profile_path: string | null;
  order?: number;
}

export interface CrewMember {
  credit_id?: string;
  department?: string;
  job?: string;
  id: number;
  name: string;
  profile_path: string | null;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}
