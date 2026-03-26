import { UserResDto } from "../users/user-res-dto";

export interface LoginResDto {
    user : UserResDto;
    token : string;
    success : boolean;
    message : string;
}