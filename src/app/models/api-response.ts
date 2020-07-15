import { Team} from '../models/team';

export interface ApiResponse {
  standings: Standing[];
    [unusedProperties: string]: any;
}
export interface Standing {
  stage: string;
  type: string;
  group: string;
  table: Team[];
}
