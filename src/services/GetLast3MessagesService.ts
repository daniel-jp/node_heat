import prismaClient from "../prisma";

class GetLast3MessagesService{
  async execute() {

    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy:{
        created: "desc"
      },
      include: {
        user:true
      },
    });
    return messages;
  }

}

export {GetLast3MessagesService};