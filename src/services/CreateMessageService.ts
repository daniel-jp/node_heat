import prismaClient from "../prisma";
import {io} from "../app"; 

class CreateMessageService{
  async execute(text: string, user_id: string){
    const messege = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const infoWS = {
      text: messege.text,
      user_id: messege.user_id,
      created: messege.created,
      user:{
        name: messege.user.name,
        avatar_url: messege.user.avatar_url,
      },
    };
    io.emit("new_message", infoWS)

    return messege;
  }

}
export{CreateMessageService};