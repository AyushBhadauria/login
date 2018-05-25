const host="http://localhost:8080"
export class EndPoint{
 public static register=host+"/users/register";
 public static profile=host+"/users/profile";
 public static authenticate=host+"/auth/local";
 public static users=host+"/users/profiles";
 public static forgot=host+"/users/forgot-password";
 public static reset=host+"/users/reset-password";
}