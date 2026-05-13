import { User } from "../models/user";

export const getUsersWithPenalties = async () => {
  const users = await User.find().select("-password");

  

  return users;
};

export const getUserOne=async (id:string)=>{
  const user_one=await User.findOne({
    "_id":id
  })
  return user_one
}

export const userScoreReset=async (id:string)=>{
  const user =await User.findById(id);
  if (!user){
    return new Error("Kullanıcı bulunamadı");
  }
  user.score=0;
  await user.save();
  return {message:"Ceza puanı sıfırlandı"}

}